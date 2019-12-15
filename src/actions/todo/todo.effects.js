import {todoEffectActionTypes} from './todo.constants';

const addNewTodo = data => {
  return {
    type: todoEffectActionTypes.ADD_NEW_TODO,
    data,
  };
};
const getAllTodos = () => {
  return {
    type: todoEffectActionTypes.GET_ALL_TODOS,
  };
};
const editTodo = (newTodo, oldTodo) => {
  return {
    type: todoEffectActionTypes.EDIT_TODO,
    newTodo,
    oldTodo,
  };
};
const removeAllTodos = () => {
  return {
    type: todoEffectActionTypes.REMOVE_ALL_TODOS_REQUEST,
  };
};
const removeTodos = () => {
  return {
    type: todoEffectActionTypes.REMOVE_TODOS_REQUEST,
  };
};
const removeTodo = todo => {
  return {
    type: todoEffectActionTypes.REMOVE_TODO_REQUEST,
    todo,
  };
};
export const todoEffects = {
  addNewTodo,
  getAllTodos,
  editTodo,
  removeTodos,
  removeTodo,
  removeAllTodos,
};
