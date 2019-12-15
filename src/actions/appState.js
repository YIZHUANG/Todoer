export const SET_APP_STATE = 'SET_APP_STATE';

export const setAppState = isAppActive => {
  return {
    type: SET_APP_STATE,
    isAppActive,
  };
};
