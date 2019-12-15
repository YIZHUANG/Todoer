import {todoMutationTypes} from './todo.constants';
const setNewToDo = todo => {
  return {
    type: todoMutationTypes.SET_NEW_TODO,
    todo,
  };
};
const setNewTodos = todos => {
  return {
    type: todoMutationTypes.SET_NEW_TODOS,
    todos,
  };
};
const setAllTodos = todos => {
  return {
    type: todoMutationTypes.SET_ALL_TODOS,
    todos,
  };
};
const setTodo = (newTodo, oldTodo) => {
  return {
    type: todoMutationTypes.SET_TODO,
    newTodo,
    oldTodo,
  };
};

const setRemoveTodos = removedTodos => {
  return {
    type: todoMutationTypes.SET_REMOVED_TODOS,
    removedTodos,
  };
};

const setRemoveTodo = removedTodo => {
  return {
    type: todoMutationTypes.SET_REMOVED_TODO,
    removedTodo,
  };
};
const clear = () => {
  return {
    type: todoMutationTypes.CLEAR,
  };
};
export const todoMutationActions = {
  setNewToDo,
  setNewTodos,
  setAllTodos,
  setTodo,
  setRemoveTodos,
  setRemoveTodo,
  clear,
};
