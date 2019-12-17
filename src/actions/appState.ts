export const SET_APP_STATE = 'SET_APP_STATE';

export const setAppState = (isAppActive: boolean) => {
  return {
    type: SET_APP_STATE,
    isAppActive,
  };
};
