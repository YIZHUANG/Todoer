import {Todo, Todos} from 'src/types';

export const MULTI_SELECT = 'MULTI_SELECT';
export const MULTI_SELECT_CLEAR = 'MULTI_SELECT_CLEAR';
export const SELECT_ALL = 'SELECT_ALL';
export const REMOVE_TODO_FROM_MULTI_SELECT = 'REMOVE_TODO_FROM_MULTI_SELECT';

export const multiSelect = (selectedTodo: Todo) => {
  return {
    type: MULTI_SELECT,
    selectedTodo,
  };
};

export const clearMultiSelect = () => {
  return {
    type: MULTI_SELECT_CLEAR,
  };
};
export const selectAll = (selectedTodos: Todos) => {
  return {
    type: SELECT_ALL,
    selectedTodos,
  };
};
export const removeFromMultiSelect = (selectedTodo: Todo) => {
  return {
    type: REMOVE_TODO_FROM_MULTI_SELECT,
    selectedTodo,
  };
};
