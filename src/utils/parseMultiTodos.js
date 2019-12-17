import getTodoType, {shouldResetTodo} from './getTodoType';

function parseMultiTodos(todos) {
  const ongoing = [];
  const todosNeededReset = [];
  const due = [];
  const past = [];
  const allTodos = {
    ongoing,
    todosNeededReset,
    due,
    past,
  };
  todos.forEach(todo => {
    const parsedTodo = JSON.parse(todo[1]);
    if (shouldResetTodo(todo)) {
      todosNeededReset.push(parsedTodo);
    } else {
      const type = getTodoType(parsedTodo);
      allTodos[type].push(parsedTodo);
    }
  });
  return allTodos;
}

export default parseMultiTodos;
