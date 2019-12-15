import {
  MULTI_SELECT,
  MULTI_SELECT_CLEAR,
  SELECT_ALL,
  REMOVE_TODO_FROM_MULTI_SELECT,
} from '../actions/multiSelect';
import {todoMutationTypes} from '../actions/todo';
import {OPEN_MODAL} from '../actions/modal';
const initialState = {
  active: false,
  selectedTodos: [],
  selectAll: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MULTI_SELECT: {
      return {
        active: true,
        selectedTodos: action.selectedTodo
          ? [...state.selectedTodos, action.selectedTodo]
          : state.selectedTodos,
      };
    }
    case MULTI_SELECT_CLEAR: {
      return initialState;
    }
    case SELECT_ALL: {
      return {
        ...state,
        selectAll: !state.selectAll,
        selectedTodos: state.selectAll ? [] : action.selectedTodos,
      };
    }
    case REMOVE_TODO_FROM_MULTI_SELECT: {
      const {selectedTodo} = action;
      return {
        ...state,
        selectedTodos: state.selectedTodos.filter(
          todo => todo.id !== selectedTodo.id,
        ),
      };
    }
    case OPEN_MODAL: {
      return initialState;
    }
    case todoMutationTypes.SET_REMOVED_TODO: {
      const {removedTodo} = action;
      return {
        ...state,
        selectedTodos: state.selectedTodos.filter(
          todo => todo.id !== removedTodo.id,
        ),
      };
    }
    default:
      return state;
  }
};

export default reducer;
