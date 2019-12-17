import AsyncStorage from '@react-native-community/async-storage';

import monitor from 'modules/monitor';
import {NOTIFICATIONS} from 'src/constants';
import {Notifications} from 'src/types';

export const getNotifications = async () => {
  try {
    const notifications = await AsyncStorage.getItem(NOTIFICATIONS);
    return JSON.parse(notifications);
  } catch (e) {
    monitor.catchError(e);
  }
};
export const editNotifications = async (notifications: Notifications) => {
  try {
    await AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications));
    return notifications;
  } catch (e) {
    monitor.catchError(e);
  }
};
