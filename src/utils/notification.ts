// This local notification lib doesn't work always, needs special/complex validation and invalidation

import {Notifications, Todos, Todo, Notification} from 'src/types';

export function shouldRequeueNotification(
  todo: Todo | undefined,
  notification: Notification,
) {
  if (!todo) {
    return false;
  }
  if (todo.done) {
    return false;
  }
  if (
    notification.text !== todo.text ||
    (todo.remindIntervalInMinutes &&
      notification.remindIntervalInMinutes !== todo.remindIntervalInMinutes)
  ) {
    return true;
  }
  return false;
}

export function isTodoQualifyForNotification(todo: Todo) {
  if (!todo.done && todo.remindIntervalInMinutes && todo.remindEnabled) {
    return true;
  }
  return false;
}

export function isExsitingNotification(
  todo: Todo | undefined,
  notification: Notification,
) {
  if (
    !shouldRemoveNotification(todo) &&
    !shouldRequeueNotification(todo, notification)
  ) {
    return true;
  }
  return false;
}

export function shouldRemoveNotification(todo: Todo | undefined) {
  if (!todo) {
    return true;
  }
  if (!isTodoQualifyForNotification(todo)) {
    return true;
  }
  return false;
}

export function getNotificationStartIndex(notifications: Notifications) {
  return (
    (notifications &&
      notifications[notifications.length - 1].notificationId + 1) ||
    0
  );
}

// cross-compare existing and new todos to ensure the existing notifications are correct in order.
export function getSyncNotification(
  todos: Todos,
  notifications: Notifications,
) {
  const existingNotifications: Notifications = [];
  const newTodosThatHasRemindEnabled: Todos = [];
  const notificationThatNeedsRemoval: Notifications = [];
  notifications.forEach(notification => {
    const matchingTodo = todos.find(todo => todo.id === notification.todoId);
    if (shouldRemoveNotification(matchingTodo)) {
      notificationThatNeedsRemoval.push(notification);
    }
    if (shouldRequeueNotification(matchingTodo, notification)) {
      notificationThatNeedsRemoval.push(notification);
      newTodosThatHasRemindEnabled.push(matchingTodo);
    }
    if (isExsitingNotification(matchingTodo, notification)) {
      existingNotifications.push(notification);
    }
  });
  todos.forEach(todo => {
    const remindEnabled = isTodoQualifyForNotification(todo);
    const isNew =
      !newTodosThatHasRemindEnabled.find(newTodo => newTodo.id === todo.id) &&
      !existingNotifications.find(
        notification => notification.todoId === todo.id,
      );
    if (remindEnabled && isNew) {
      newTodosThatHasRemindEnabled.push(todo);
    }
  });
  return {
    existingNotifications,
    newTodosThatHasRemindEnabled,
    notificationThatNeedsRemoval,
  };
}
