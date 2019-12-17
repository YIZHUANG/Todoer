import React from 'react';
import {View, StyleSheet} from 'react-native';
import useSelector from 'hooks/useSelector';

import TaskListItem from './TaskListItem';

import {Todos, Todo} from 'src/types';
import ListHeading from './Typography/ListHeading';

const TaskList = ({todos, category}: {todos: Todos; category?: string}) => {
  const isMultiSelectEnable = useSelector(state => state.multiSelect.active);
  const selectedTodos = useSelector(state => state.multiSelect.selectedTodos);
  const selectedTodosTable = {};
  if (!todos.length) {
    return null;
  }
  if (selectedTodos.length) {
    selectedTodos.forEach((todo: Todo) => {
      selectedTodosTable[todo.id] = true;
    });
  }
  function getIsBeingSelected(id: string) {
    return !!selectedTodosTable[id];
  }
  return (
    <View>
      {category && <ListHeading style={styles.listHeading} text={category} />}
      {todos.map(todo => (
        <TaskListItem
          isBeingSelected={getIsBeingSelected(todo.id)}
          isMultiSelectEnable={isMultiSelectEnable}
          todo={todo}
          key={todo.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeading: {
    marginBottom: 10,
    fontSize: 19
  },
});

export default TaskList;
