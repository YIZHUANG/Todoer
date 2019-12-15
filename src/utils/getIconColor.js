import isPast from 'date-fns/isPast';
import {iOSColors} from 'react-native-typography';
import isToday from 'date-fns/isToday';

function byDeadline(todo) {
  const {deadline} = todo;
  if (!deadline) {
    return '';
  }
  if (isPast(new Date(deadline))) {
    return iOSColors.red;
  }
  if (isToday(new Date(deadline))) {
    return iOSColors.blue;
  }
  return iOSColors.green;
}

export default {byDeadline};
