import uuidv4 from 'uuid/v4';

import {CreateTodo, Todo} from 'src/types';

const createTodo = (todo: CreateTodo) => {
  const id = uuidv4();
  const newTodo = {
    id,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    ...todo,
  };
  return newTodo;
};

const editTodo = (todo: Todo) => {
  return {...todo, lastUpdated: new Date().toISOString()};
};

const completedTodo = (todo: Todo) => {
  return {
    ...todo,
    done: true,
    completeDate: new Date().toISOString(),
  };
};

const createNotification = (todo: Todo, notificationId: number) => {
  const {id, remindIntervalInMinutes, text} = todo;
  return {
    todoId: id,
    notificationId,
    remindIntervalInMinutes,
    text,
  };
};

export default {createTodo, editTodo, completedTodo, createNotification};
