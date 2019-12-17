import {SET_APP_STATE} from 'actions/appState';

const initialState = {
  isAppActive: false,
};
const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        isAppActive: action.isAppActive,
      };
    default:
      return state;
  }
};

export default appState;
