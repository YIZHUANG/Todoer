import getTodoType, {isRepeatEveryDayTask} from './getTodoType';

function parseMultiTodos(todos) {
  const ongoing = [];
  const repeatEveryDay = [];
  const due = [];
  const past = [];
  const allTodos = {
    ongoing,
    repeatEveryDay,
    due,
    past,
  };
  todos.forEach(todo => {
    const parsedTodo = JSON.parse(todo[1]);
    if (isRepeatEveryDayTask(todo)) {
      repeatEveryDay.push(parsedTodo);
    } else {
      const type = getTodoType(parsedTodo);
      allTodos[type].push(parsedTodo);
    }
  });
  return allTodos;
}

export default parseMultiTodos;
