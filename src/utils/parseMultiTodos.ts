import getTodoType, {shouldResetTodo} from './getTodoType';

type TodosWithKeyValue = [string, string][];

function parseMultiTodos(todos: TodosWithKeyValue) {
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
    if (shouldResetTodo(parsedTodo)) {
      todosNeededReset.push(parsedTodo);
    } else {
      const type = getTodoType(parsedTodo);
      allTodos[type].push(parsedTodo);
    }
  });
  return allTodos;
}

export default parseMultiTodos;
