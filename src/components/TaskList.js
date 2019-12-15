import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import TaskListItem from './TaskListItem';
import SubHeading from './Typography/SubHeading';

const TaskList = ({todos, category}) => {
  const isMultiSelectEnable = useSelector(state => state.multiSelect.active);
  const selectedTodos = useSelector(state => state.multiSelect.selectedTodos);
  const selectedTodosTable = {};
  if (!todos.length) {
    return null;
  }
  if (selectedTodos.length) {
    selectedTodos.forEach(todo => {
      selectedTodosTable[todo.id] = true;
    });
  }
  function getIsBeingSelected(id) {
    return !!selectedTodosTable[id];
  }
  return (
    <View>
      {category && (
        <SubHeading
          style={{
            marginBottom: 20,
          }}
          text={category}
        />
      )}
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

export default TaskList;
