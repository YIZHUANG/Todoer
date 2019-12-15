import AsyncStorage from '@react-native-community/async-storage';

import {SETTINGS} from '../constants';

export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(SETTINGS);
    return settings;
  } catch (e) {}
};
export const editSettings = async settings => {
  try {
    await AsyncStorage.mergeItem(SETTINGS, JSON.stringify(settings));
    return settings;
  } catch (e) {}
};
