import getTodoType from 'utils/getTodoType';

function replaceTodoWithNewOne(todos, oldTodo, newTodo) {
  const index = todos.findIndex(existingTodo => existingTodo.id === oldTodo.id);
  const todo = {...oldTodo, ...newTodo};
  const newTodos = todos.slice();
  newTodos[index] = todo;
  return newTodos;
}

export function getStateWhenMultipleTodosEdited(state, action) {
  const {todos} = action;
  const allTodos = {
    past: state.past,
    ongoing: state.ongoing,
    due: state.due,
  };
  todos.forEach(todo => {
    const type = getTodoType(todo);
    if (todo) {
      allTodos[type] = [...allTodos[type], todo];
    }
  });
  return {
    ...state,
    ...allTodos,
  };
}
export function getStateWhenSingleTodoEdtied(state, action) {
  const {oldTodo, newTodo} = action;
  const oldTodoType = getTodoType(oldTodo);
  const newTodoType = getTodoType(newTodo);
  if (oldTodoType === newTodoType) {
    return {
      ...state,
      [newTodoType]: replaceTodoWithNewOne(
        state[newTodoType],
        oldTodo,
        newTodo,
      ),
    };
  }
  return {
    ...state,
    [oldTodoType]: state[oldTodoType].filter(
      existingTodo => existingTodo.id !== oldTodo.id,
    ),
    [newTodoType]: [...state[newTodoType], newTodo],
  };
}

export function getStateWhenMultipleTodosDeleted(state, action) {
  const {removedTodos} = action;
  const allTodos = {
    past: state.past,
    ongoing: state.ongoing,
    due: state.due,
  };
  removedTodos.forEach(selectedTodo => {
    const type = getTodoType(selectedTodo);
    allTodos[type] = allTodos[type].filter(todo => todo.id !== selectedTodo.id);
  });
  return {
    ...state,
    ...allTodos,
  };
}
