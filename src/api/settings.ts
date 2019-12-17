import AsyncStorage from '@react-native-community/async-storage';

import monitor from 'modules/monitor';
import {SETTINGS} from 'src/constants';

export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(SETTINGS);
    return settings;
  } catch (e) {
    monitor.catchError(e);
  }
};
export const editSettings = async settings => {
  try {
    await AsyncStorage.mergeItem(SETTINGS, JSON.stringify(settings));
    return settings;
  } catch (e) {
    monitor.catchError(e);
  }
};
