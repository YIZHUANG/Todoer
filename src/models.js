import uuidv4 from 'uuid/v4';

/*
const {id, text, createdAt, lastUpdated, done, completeDate, repeat} = todo;
*/

const createTodo = todo => {
  const id = uuidv4();
  const newTodo = {
    id,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    ...todo,
  };
  return newTodo;
};

const editTodo = todo => {
  return {...todo, lastUpdated: new Date().toISOString()};
};

const completedTodo = todo => {
  return {
    ...todo,
    done: true,
    completeDate: new Date(),
  };
};

export default {createTodo, editTodo, completedTodo};
