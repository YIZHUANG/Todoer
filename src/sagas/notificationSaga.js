import {takeLatest, fork, takeEvery} from 'redux-saga/effects';

import {todoMutationTypes} from 'actions/todo';
import notificationService, {
  notificationList,
} from 'modules/notificationService';
import {settingsMutationTypes} from 'actions/settings';

function setupInitialNotification(todos) {
  const {ongoing, due} = todos;
  const allTodos = [...ongoing, ...due];
  const todosWithRemindEnable = allTodos.filter(
    todo => todo.remindIntervalInMinutes && todo.remindEnabled,
  );
  todosWithRemindEnable.forEach(todo => {
    notificationService.queueNotification(todo);
  });
}

function* handleWhenTodoEditedSaga(action) {
  const {newTodo} = action;
  const existInQueue = notificationList.find(
    notification => notification.todoId === newTodo.id,
  );
  if (existInQueue) {
    notificationService.cancelNotification(existInQueue.notificationId);
  }
  if (newTodo.remindEnabled && newTodo.remindIntervalInMinutes) {
    if (!newTodo.done) {
      notificationService.queueNotification(newTodo);
    }
  }
}

function* handleWhenNewTodosAddedSaga(action) {
  action.todos ||
    [action.todo]
      .filter(todo => todo.remindEnabled && todo.remindIntervalInMinutes)
      .forEach(todo => {
        notificationService.queueNotification(todo);
      });
}
function* handleWhenTodosDeletedSaga(action) {
  const {removedTodos} = action;
  removedTodos.forEach(todo => {
    const existInQueue = notificationList.find(
      notification => notification.todoId === todo.id,
    );
    if (existInQueue) {
      notificationService.cancelNotification(existInQueue.notificationId);
    }
  });
}
function* handleWhenAllTodosDeletedSaga() {
  notificationService.cancelAllNotifications();
}
function* initNotificationSaga(todos) {
  notificationService.configure();
  setupInitialNotification(todos);
}
function* initApplicationSaga(action) {
  // fetchFettings();
  const {todos} = action;
  //yield fork(initSettingsSaga);
  yield fork(initNotificationSaga, todos);
}
//function* notificationSaga(action) {}

const notificationSagas = [
  // takeEvery('*', notificationSaga),
  takeLatest(settingsMutationTypes.SET_SETTINGS, initNotificationSaga),
  takeLatest(todoMutationTypes.SET_ALL_TODOS, initApplicationSaga),
  takeEvery(
    [todoMutationTypes.SET_NEW_TODO, todoMutationTypes.SET_NEW_TODOS],
    handleWhenNewTodosAddedSaga,
  ),
  takeEvery(todoMutationTypes.CLEAR, handleWhenAllTodosDeletedSaga),
  takeEvery(todoMutationTypes.SET_REMOVED_TODOS, handleWhenTodosDeletedSaga),
  takeEvery(todoMutationTypes.SET_TODO, handleWhenTodoEditedSaga),
];

export default notificationSagas;
