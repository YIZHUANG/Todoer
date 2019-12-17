import {
  put,
  call,
  fork,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import endOfDay from 'date-fns/endOfDay';

import {
  addTodo,
  getAllTodos,
  editTodo,
  removeTodos,
  editTodos,
  removeTodo,
  removeAllTodos,
} from '../api/todo';
import {todoEffectActionTypes, todoMutationActions} from 'actions/todo';
import {clearMultiSelect} from 'actions/multiSelect';
import {closeModal} from 'actions/modal';
import omit from 'utils/omit';

function* addNewTodoSaga(action) {
  const newTodo = yield call(addTodo, action.data);
  yield put(todoMutationActions.setNewToDo(newTodo));
  yield put(closeModal());
}
function* updateTodoSaga(action) {
  const editedTodo = yield call(editTodo, action.newTodo);
  yield put(todoMutationActions.setTodo(editedTodo, action.oldTodo));
  const modal = yield select(state => state.modal.component);
  if (modal) {
    yield put(closeModal());
  }
}

function* resetTodosSaga(todos) {
  const resetedTodos = [];
  const resetedTodosWithKeyValue = [];
  todos.forEach(todo => {
    const resetedTodo = {
      ...todo,
      done: false,
      deadline: endOfDay(new Date()).toISOString(),
    };
    resetedTodos.push(resetedTodo);
    resetedTodosWithKeyValue.push([
      resetedTodo.id,
      JSON.stringify(resetedTodo),
    ]);
  });
  yield call(editTodos, resetedTodosWithKeyValue);
  yield put(todoMutationActions.setNewTodos(resetedTodos));
}

function* getAllTodosSaga() {
  const allTodos = yield call(getAllTodos);
  const {todosNeededReset} = allTodos;
  if (todosNeededReset.length) {
    yield fork(resetTodosSaga, todosNeededReset);
  }
  yield put(
    todoMutationActions.setAllTodos(omit(allTodos, ['repeatEveryDay'])),
  );
}

function* deleteTodosSaga() {
  const selectedTodos = yield select(state => state.multiSelect.selectedTodos);
  yield call(removeTodos, selectedTodos);
  yield put(todoMutationActions.setRemoveTodos(selectedTodos));
  yield put(clearMultiSelect());
}
function* deleteTodoSaga(action) {
  const {todo} = action;
  yield call(removeTodo, todo);
  yield put(todoMutationActions.setRemoveTodo(todo));
}
function* deleteAllTodosSaga() {
  yield call(removeAllTodos);
  yield put(todoMutationActions.clear());
}

const todoSagas = [
  takeEvery(todoEffectActionTypes.ADD_NEW_TODO, addNewTodoSaga),
  takeLatest(todoEffectActionTypes.GET_ALL_TODOS, getAllTodosSaga),
  takeLatest(
    todoEffectActionTypes.REMOVE_ALL_TODOS_REQUEST,
    deleteAllTodosSaga,
  ),
  takeEvery(todoEffectActionTypes.EDIT_TODO, updateTodoSaga),
  takeEvery(todoEffectActionTypes.REMOVE_TODOS_REQUEST, deleteTodosSaga),
  takeEvery(todoEffectActionTypes.REMOVE_TODO_REQUEST, deleteTodoSaga),
];

export default todoSagas;
