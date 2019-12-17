import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

import useTheme from 'hooks/useTheme';
import {todoEffects} from 'actions/todo';
import {multiSelect, removeFromMultiSelect} from 'actions/multiSelect';
import {getDate, getFullDate} from 'utils/time';
import IconWithText from 'components/Icons/IconWithText';
import getIconColor from 'utils/getIconColor';
import FootNote from 'components/Typography/FootNote';
import todoModels from 'src/models';
import useEditTodoModal from 'hooks/useEditTodoModal';
import {Todo} from 'src/types';
import ButtonWithPressStatus from 'components/Buttons/ButtonWithPressStatus';

const CheckIcon = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon type="material-community" name="check-circle" />
    </TouchableOpacity>
  );
};
const DeleteIcon = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon type="material-community" name="minus-circle" />
    </TouchableOpacity>
  );
};

const TaskListItem = ({
  todo,
  isMultiSelectEnable,
  isBeingSelected,
}: {
  todo: Todo;
  isMultiSelectEnable: boolean;
  isBeingSelected: boolean;
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {text, deadline, completeDate} = todo;
  const [openEditModal] = useEditTodoModal(todo);
  let containerStyle: ViewStyle = {};
  if (isBeingSelected) {
    containerStyle.opacity = 0.8;
  }
  function onCompleteTodo() {
    if (isBeingSelected) {
      dispatch(removeFromMultiSelect(todo));
    }
    dispatch(todoEffects.editTodo(todoModels.completedTodo(todo), todo));
  }
  function onBodyClick() {
    if (!isMultiSelectEnable) {
      openEditModal();
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
          Completed {getFullDate(completeDate)}
        </FootNote>
      );
    }
    if (deadline) {
      return (
        <IconWithText
          iconColor={getIconColor.byDeadline(todo)}
          iconName="card-bulleted-outline">
          {getFullDate(deadline)}
        </IconWithText>
      );
    }
    return null;
  }

  return (
    <View style={theme.topBottomMargin(5)}>
      <ListItem
        containerStyle={containerStyle}
        Component={ButtonWithPressStatus}
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
    </View>
  );
};

export default TaskListItem;
