import PushNotification from 'react-native-push-notification';
import addMinutes from 'date-fns/addMinutes';

import {minutesToMilliseconds} from 'utils/time';
import models from 'src/models';
import {getNotificationStartIndex} from 'utils/notification';
import {Notifications, Todo} from 'src/types';

class NotificationService {
  notifications = [];
  index = 0;
  configure() {
    PushNotification.configure({
      onNotification: function() {
        // console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: false,
      requestPermissions: true,
    });
  }
  setNotifications(notifications: Notifications) {
    this.notifications = notifications.sort(
      (a, b) => a.notificationId - b.notificationId,
    );
    this.index = getNotificationStartIndex(this.notifications);
  }
  cancelAllNotifications() {
    console.log('Clearing all notification...');
    PushNotification.cancelAllLocalNotifications();
    this.notifications = [];
  }
  cancelNotification(id: number) {
    console.log('Clearing notification with id', id);
    PushNotification.cancelLocalNotifications({id: JSON.stringify(id)});
    this.notifications = this.notifications.filter(
      notification => notification.notificationId !== id,
    );
  }
  queueNotification(todo: Todo) {
    const {remindIntervalInMinutes, text} = todo;
    this.notifications.push(models.createNotification(todo, this.index));
    PushNotification.localNotificationSchedule(
      this.getNotificationTemplate(this.index, text, remindIntervalInMinutes),
    );
    this.index++;
  }
  getNotificationTemplate(
    id: number,
    text: string,
    remindIntervalInMinutes: number,
  ) {
    return {
      /* Android Only Properties */
      id: JSON.stringify(id),
      date: addMinutes(new Date(), remindIntervalInMinutes),
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: text, // (optional) default: "message" prop
      subText: 'Your ongoing task', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: false, // (optional) default: true
      //  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      // tag: 'some_tag', // (optional) add tag to message
      // group: "group", // (optional) add group to message
      ongoing: true, // (optional) set whether this is an "ongoing" notification
      //priority: "high", // (optional) set notification priority, default: high
      visibility: 'private', // (optional) set notification visibility, default: private
      //importance: "high", // (optional) set notification importance, default: high
      message: text,
      repeatType: 'time',
      repeatTime: minutesToMilliseconds(remindIntervalInMinutes),
      actions: '["Ok"]',
    };
  }
}

const notificationService = new NotificationService();

export default notificationService;
