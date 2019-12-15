import {OPEN_MODAL, CLOSE_MODAL} from '../actions/modal';

const initialState = {
  component: null,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        component: action.component,
      };
    }
    case CLOSE_MODAL: {
      return {
        component: null,
      };
    }
    default:
      return state;
  }
};

export default search;
