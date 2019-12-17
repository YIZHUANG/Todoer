import { settingsEffectActionTypes } from './settings.constants';

const getSettings = () => {
  return {
    type: settingsEffectActionTypes.GET_SETTINGS,
  };
};
const editSettings = settings => {
  return {
    type: settingsEffectActionTypes.EDIT_SETTINGS,
    settings,
  };
};

export const settingsEffects = {
  getSettings,
  editSettings,
};