import PushNotification from 'react-native-push-notification';
import addMinutes from 'date-fns/addMinutes';

import {minutesToMilliseconds} from 'utils/time';

export let notificationList = [];
let index = 0;

class NotificationService {
  configure(settings) {
    // todos.
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: false,
      requestPermissions: true,
    });
  }
  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
  cancelNotification(id) {
    PushNotification.cancelLocalNotifications({id: JSON.stringify(id)});
    notificationList = notificationList.filter(
      notification => notification.notificationId !== id,
    );
  }
  queueNotification(todo) {
    const {remindIntervalInMinutes, id, text} = todo;
    notificationList.push({
      todoId: id,
      notificationId: index,
    });
    PushNotification.localNotificationSchedule(
      this.getNotificationTemplate(index, text, remindIntervalInMinutes),
    );
    index++;
  }
  getNotificationTemplate(id, text, remindIntervalInMinutes) {
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
