import {
  OPEN_SEARCH,
  CLOSE_SEARCH,
  TOGGLE_SEARCH,
  ON_SEARCH,
} from 'actions/search';

const initialState = {
  active: false,
  keyword: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SEARCH: {
      return {
        active: true,
        keyword: '',
      };
    }
    case CLOSE_SEARCH: {
      return {
        active: false,
        keyword: '',
      };
    }
    case TOGGLE_SEARCH: {
      return {
        active: !state.active,
        keyword: '',
      };
    }
    case ON_SEARCH: {
      return {
        ...state,
        keyword: action.keyword,
      };
    }
    default:
      return state;
  }
};

export default search;
