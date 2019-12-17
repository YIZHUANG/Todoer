import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isYesterday from 'date-fns/isYesterday';
import isThisWeek from 'date-fns/isThisWeek';
import format from 'date-fns/format';
import isThisYear from 'date-fns/isThisYear';

function minutesToMilliseconds(minutes: number) {
  return minutes * 60000;
}
function getDate(date?: string) {
  if (!date) {
    return null;
  }
  const parseDate = new Date(date);
  if (isToday(parseDate)) {
    return 'Today';
  }
  if (isTomorrow(parseDate)) {
    return 'Tomorrow';
  }
  if (isYesterday(parseDate)) {
    return 'Yesterday';
  }
  if (isThisWeek(parseDate)) {
    return format(parseDate, 'EEEE');
  }
  if (isThisYear(parseDate)) {
    return format(parseDate, 'EEEE dd LLL');
  }
  return format(parseDate, 'dd LLL, yyyy');
}
function getTime(date: string) {
  const parseDate = new Date(date);
  return format(parseDate, 'h:m a');
}
function getFullDate(date: string) {
  return `${getDate(date)} ${getTime(date)}`;
}
export {minutesToMilliseconds, getDate, getTime, getFullDate};
