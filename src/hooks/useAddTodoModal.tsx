import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import uuid4 from 'uuid/v4';

import TodoModal from 'components/Modals/TodoModal';
import {openModal, closeModal} from 'actions/modal';
import {ModalTypes, CreateTodo} from 'src/types';
import {todoEffects} from 'actions/todo';
import useTranslate from './useTranslate';

const useAddTodoModal = () => {
  const key = useRef(uuid4());
  const dispatch = useDispatch();
  const t = useTranslate();
  function onAddNewTodo(todo: CreateTodo) {
    dispatch(todoEffects.addNewTodo(todo, key.current));
  }
  function closeAddTodoModal() {
    dispatch(closeModal(key.current));
  }

  function openAddTodoModal() {
    dispatch(
      openModal({
        key: key.current,
        name: ModalTypes.ADD_TODO_MODAL,
        component: (
          <TodoModal
            title={t('NEW_TODO')}
            onClose={closeAddTodoModal}
            onSubmit={onAddNewTodo}
          />
        ),
      }),
    );
  }

  return [openAddTodoModal];
};

export default useAddTodoModal;
