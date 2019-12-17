import isPast from 'date-fns/isPast';
import isToday from 'date-fns/isToday';

import theme from 'styles/theme';

function byDeadline(todo) {
  const {deadline} = todo;
  if (!deadline) {
    return '';
  }
  if (isPast(new Date(deadline))) {
    return theme.red;
  }
  if (isToday(new Date(deadline))) {
    return theme.blue;
  }
  return theme.green;
}

export default {byDeadline};
