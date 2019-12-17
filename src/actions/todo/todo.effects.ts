import {todoEffectActionTypes} from './todo.constants';
import {Todo, CreateTodo} from 'src/types';

const addNewTodo = (todo: CreateTodo, modalKey: string) => {
  return {
    type: todoEffectActionTypes.ADD_NEW_TODO,
    todo,
    modalKey,
  };
};
const getAllTodos = () => {
  return {
    type: todoEffectActionTypes.GET_ALL_TODOS,
  };
};
const editTodo = (newTodo: Todo, oldTodo: Todo, modalKey?: string) => {
  return {
    type: todoEffectActionTypes.EDIT_TODO,
    newTodo,
    oldTodo,
    modalKey,
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
const removeTodo = (todo: Todo) => {
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
