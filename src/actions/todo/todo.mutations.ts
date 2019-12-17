import {todoMutationTypes} from './todo.constants';
import {Todo, Todos} from 'src/types';

const setNewToDo = (todo: Todo) => {
  return {
    type: todoMutationTypes.SET_NEW_TODO,
    todo,
  };
};
const setNewTodos = (todos: Todos) => {
  return {
    type: todoMutationTypes.SET_NEW_TODOS,
    todos,
  };
};
const setAllTodos = (todos: Todos) => {
  return {
    type: todoMutationTypes.SET_ALL_TODOS,
    todos,
  };
};
const setTodo = (newTodo: Todo, oldTodo: Todo) => {
  return {
    type: todoMutationTypes.SET_TODO,
    newTodo,
    oldTodo,
  };
};

const setRemoveTodos = (removedTodos: Todos) => {
  return {
    type: todoMutationTypes.SET_REMOVED_TODOS,
    removedTodos,
  };
};

const setRemoveTodo = (removedTodo: Todo) => {
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
