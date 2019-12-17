import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

import useTheme from 'hooks/useTheme';
import TodoModal from './Modals/TodoModal/TodoModal';
import {todoEffects} from 'actions/todo';
import {openModal} from 'actions/modal';
import {multiSelect, removeFromMultiSelect} from 'actions/multiSelect';
import {getDate, getFullDate} from 'utils/time';
import IconWithText from './Icons/IconWithText';
import getIconColor from 'utils/getIconColor';
import FootNote from './Typography/FootNote';
import todoModels from '../models';

const CheckIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon type="material-community" name="check-circle" />
    </TouchableOpacity>
  );
};
const DeleteIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon type="material-community" name="minus-circle" />
    </TouchableOpacity>
  );
};

const TaskListItem = ({todo, isMultiSelectEnable, isBeingSelected}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {text, deadline, completeDate} = todo;

  function onEditTodo(editedTodo) {
    const newTodo = {id: todo.id, ...editedTodo};
    dispatch(todoEffects.editTodo(newTodo, todo));
  }
  let containerStyle = {};
  if (isBeingSelected) {
    containerStyle = {
      opacity: 0.8,
    };
  }
  function onCompleteTodo() {
    if (isBeingSelected) {
      dispatch(removeFromMultiSelect(todo));
    }
    dispatch(todoEffects.editTodo(todoModels.completedTodo(todo), todo));
  }
  function onBodyClick() {
    if (!isMultiSelectEnable) {
      dispatch(
        openModal(
          <TodoModal title="Edit task" todo={todo} onSubmit={onEditTodo} />,
        ),
      );
    } else {
      if (isBeingSelected) {
        dispatch(removeFromMultiSelect(todo));
      } else {
        dispatch(multiSelect(todo));
      }
    }
  }
  function enableMultiSelect() {
    dispatch(multiSelect(todo));
  }
  function onRemoveTodo() {
    dispatch(todoEffects.removeTodo(todo));
  }
  function getSubtitle() {
    if (todo.done) {
      return (
        <FootNote
          style={{
            marginTop: 10,
          }}>
          Completed at {getFullDate(completeDate)}
        </FootNote>
      );
    }
    if (deadline) {
      return (
        <IconWithText
          iconColor={getIconColor.byDeadline(todo)}
          iconName="card-bulleted-outline">
          {getDate(deadline)}
        </IconWithText>
      );
    }
    return null;
  }

  return (
    <ListItem
      containerStyle={{
        ...containerStyle,
        ...theme.topBottomMargin(5),
      }}
      Component={TouchableWithoutFeedback}
      onLongPress={enableMultiSelect}
      onPress={onBodyClick}
      rightIcon={
        isBeingSelected ? (
          <DeleteIcon onPress={onRemoveTodo} />
        ) : (
          !todo.done && <CheckIcon onPress={onCompleteTodo} />
        )
      }
      title={text}
      subtitle={getSubtitle()}
      bottomDivider={!isBeingSelected}
    />
  );
};

export default TaskListItem;
