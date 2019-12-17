import isPast from 'date-fns/isPast';
import isToday from 'date-fns/isToday';
import {TodoTypes, RepeatTypes, Todo} from 'src/types';

function getTodoType(todo: Todo): TodoTypes {
  const {deadline, done} = todo;
  if (done) {
    return TodoTypes.PAST;
  }
  if (!deadline) {
    return TodoTypes.ONGOING;
  }
  const parsedDate = new Date(deadline);
  if (isPast(parsedDate)) {
    return TodoTypes.DUE;
  }
  return TodoTypes.ONGOING;
}

function shouldResetTodo(todo: Todo): boolean {
  const {deadline, repeat} = todo;
  if (
    repeat === RepeatTypes.DAILY &&
    deadline &&
    !isToday(new Date(deadline))
  ) {
    return true;
  }
  return false;
}

export {shouldResetTodo};
export default getTodoType;
