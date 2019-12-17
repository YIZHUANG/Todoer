import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import uuid4 from 'uuid/v4';

import TodoModal from 'components/Modals/TodoModal';
import {openModal, closeModal} from 'actions/modal';
import {ModalTypes, Todo, TodoWithoutId} from 'src/types';
import {todoEffects} from 'actions/todo';
import useTranslate from './useTranslate';

const useEditTodoModal = (todo: Todo) => {
  const key = useRef(uuid4());
  const dispatch = useDispatch();
  const t = useTranslate();
  function onEditTodo(editedTodo: TodoWithoutId) {
    const newTodo = {id: todo.id, ...editedTodo};
    dispatch(todoEffects.editTodo(newTodo, todo, key.current));
  }

  function openEditModal() {
    dispatch(
      openModal({
        key: key.current,
        name: ModalTypes.EDIT_TODO_MODAL,
        component: (
          <TodoModal
            onClose={closeEditModal}
            onSubmit={onEditTodo}
            todo={todo}
            title={t('EDIT_TODO')}
          />
        ),
      }),
    );
  }
  function closeEditModal() {
    dispatch(closeModal(key.current));
  }

  return [openEditModal];
};

export default useEditTodoModal;
