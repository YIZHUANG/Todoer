import {todoMutationTypes} from 'actions/todo';
import getTodoType from 'utils/getTodoType';
import {
  getStateWhenMultipleTodosEdited,
  getStateWhenSingleTodoEdtied,
  getStateWhenMultipleTodosDeleted,
} from './helper';

const initialState = {
  initialized: false,
  past: [],
  ongoing: [],
  due: [],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case todoMutationTypes.SET_NEW_TODO: {
      const {todo} = action;
      const type = getTodoType(todo);
      return {
        ...state,
        [type]: [...state[type], todo],
      };
    }
    case todoMutationTypes.SET_NEW_TODOS: {
      return getStateWhenMultipleTodosEdited(state, action);
    }
    case todoMutationTypes.SET_ALL_TODOS: {
      return {
        ...state,
        past: action.todos.past,
        ongoing: action.todos.ongoing,
        due: action.todos.due,
        initialized: true,
      };
    }
    case todoMutationTypes.SET_TODO: {
      return getStateWhenSingleTodoEdtied(state, action);
    }
    case todoMutationTypes.SET_REMOVED_TODOS: {
      return getStateWhenMultipleTodosDeleted(state, action);
    }
    case todoMutationTypes.SET_REMOVED_TODO: {
      const {removedTodo} = action;
      const type = getTodoType(removedTodo);
      return {
        ...state,
        [type]: state[type].filter(todo => todo.id !== removedTodo.id),
      };
    }
    case todoMutationTypes.CLEAR: {
      return {
        ...initialState,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export default todos;
