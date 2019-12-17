import {OPEN_MODAL, CLOSE_MODAL} from 'actions/modal';

const initialState = {
  modals: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      const {component, key, name} = action;
      return {
        modals: [
          ...state.modals,
          {
            key,
            component,
            name,
          },
        ],
      };
    }
    case CLOSE_MODAL: {
      const {key} = action;
      return {
        modals: state.modals.filter(modal => modal.key !== key),
      };
    }
    default:
      return state;
  }
};

export default search;
