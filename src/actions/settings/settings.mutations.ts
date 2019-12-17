import { settingsMutationTypes } from './settings.constants';

const setSettings = settings => {
  return {
    type: settingsMutationTypes.SET_SETTINGS,
    settings,
  };
};

export const settingsMutations = {
  setSettings,
};
