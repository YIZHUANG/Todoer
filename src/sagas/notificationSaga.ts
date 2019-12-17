// This local notification lib doesn't work always, needs special/complex validation and invalidation

import {takeLatest, fork, call, takeEvery} from 'redux-saga/effects';

import {todoMutationTypes} from 'actions/todo';
import {getNotifications, editNotifications} from 'api/notification';
import notificationService from 'modules/notificationService';
import {
  getSyncNotification,
  shouldRemoveNotification,
  shouldRequeueNotification,
  isTodoQualifyForNotification,
} from 'utils/notification';
import {Notifications, AllTodos} from 'src/types';

function* setupInitialNotificationSaga(
  todos: AllTodos,
  notifications: Notifications,
) {
  const {ongoing, due, past} = todos;
  const allTodos = [...ongoing, ...due, ...past];
  const {
    newTodosThatHasRemindEnabled,
    notificationThatNeedsRemoval,
    existingNotifications,
  } = getSyncNotification(allTodos, notifications);
  console.log(
    newTodosThatHasRemindEnabled,
    notificationThatNeedsRemoval,
    existingNotifications,
  );
  notificationService.setNotifications(existingNotifications);
  notificationThatNeedsRemoval.forEach(notification => {
    notificationService.cancelNotification(notification.notificationId);
  });
  newTodosThatHasRemindEnabled.forEach(todo => {
    notificationService.queueNotification(todo);
  });
  yield fork(updateNotificationToLocalStorageSaga);
}

function* updateNotificationToLocalStorageSaga() {
  yield call(editNotifications, notificationService.notifications);
}

function* handleWhenTodoEditedSaga(action) {
  const {newTodo} = action;
  const existInQueue = notificationService.notifications.find(
    notification => notification.todoId === newTodo.id,
  );
  if (existInQueue) {
    if (shouldRemoveNotification(newTodo)) {
      notificationService.cancelNotification(existInQueue.notificationId);
    }
    if (shouldRequeueNotification(newTodo, existInQueue)) {
      notificationService.cancelNotification(existInQueue.notificationId);
      notificationService.queueNotification(newTodo);
    }
  } else {
    if (isTodoQualifyForNotification(newTodo)) {
      notificationService.queueNotification(newTodo);
    }
  }
  yield fork(updateNotificationToLocalStorageSaga);
}

function* handleWhenNewTodosAddedSaga(action) {
  action.todos ||
    [action.todo]
      .filter(todo => isTodoQualifyForNotification(todo))
      .forEach(todo => {
        notificationService.queueNotification(todo);
      });
  yield fork(updateNotificationToLocalStorageSaga);
}

function* handleWhenTodosDeletedSaga(action) {
  const {removedTodos} = action;
  removedTodos.forEach(todo => {
    const existInQueue = notificationService.notifications.find(
      notification => notification.todoId === todo.id,
    );
    if (existInQueue) {
      notificationService.cancelNotification(existInQueue.notificationId);
    }
  });
  yield fork(updateNotificationToLocalStorageSaga);
}

function* handleWhenAllTodosDeletedSaga() {
  notificationService.cancelAllNotifications();
  yield fork(updateNotificationToLocalStorageSaga);
}

function* initNotificationSaga(todos: AllTodos) {
  notificationService.configure();
  const notifications = yield call(getNotifications);

  if (Array.isArray(notifications) && notifications.length > 0) {
    yield fork(setupInitialNotificationSaga, todos, notifications);
  }
}

function* initSaga(action) {
  const {todos} = action;
  yield fork(initNotificationSaga, todos);
}

const notificationSagas = [
  takeLatest(todoMutationTypes.SET_ALL_TODOS, initSaga),
  takeEvery(
    [todoMutationTypes.SET_NEW_TODO, todoMutationTypes.SET_NEW_TODOS],
    handleWhenNewTodosAddedSaga,
  ),
  takeEvery(todoMutationTypes.CLEAR, handleWhenAllTodosDeletedSaga),
  takeEvery(todoMutationTypes.SET_REMOVED_TODOS, handleWhenTodosDeletedSaga),
  takeEvery(todoMutationTypes.SET_TODO, handleWhenTodoEditedSaga),
];

export default notificationSagas;
