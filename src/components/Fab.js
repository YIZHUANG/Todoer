import React from 'react';
import FloatingButton from 'react-native-fab';

import {useDispatch} from 'react-redux';
import {openModal} from 'actions/modal';
import {todoEffects} from 'actions/todo';
import TodoModal from './Modals/TodoModal/TodoModal';
import useTheme from 'hooks/useTheme';

const Fab = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  function onSubmit(data) {
    dispatch(todoEffects.addNewTodo(data));
  }
  function showAddNewTodoModal() {
    dispatch(openModal(<TodoModal onSubmit={onSubmit} />));
  }
  return (
    <FloatingButton
      buttonColor={theme.orange}
      iconTextColor={theme.white}
      onClickAction={showAddNewTodoModal}
      visible
    />
  );
};

export default Fab;
