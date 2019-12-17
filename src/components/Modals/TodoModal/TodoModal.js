import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {closeModal} from 'actions/modal';
import useTheme from 'hooks/useTheme';
import DateTimePicker from '../../DateTimePicker';
import DropdownModal from '../DropdownModal';
import {
  DEFAULT_REMIND_INTERVAL_IN_MINUTES,
  DEFAULT_TODO_TITLE_PLACEHOLDER,
} from '../../../constants';
import DateSelectors from './DateSelectors';
import PrimaryHeading from '../../Typography/PrimaryHeading';
import Container from '../../Container';
import TodoSettings from './TodoSettings';
import SubmitButton from '../../Buttons/SubmitButton';

const ModalContent = ({todo = {}, onSubmit, title = 'Create a new task'}) => {
  /*
  todos: port modals to redux.
  */
  const theme = useTheme();
  const inputRef = useRef();
  const styles = createStyles(theme);
  const deadline = useSelector(state => state.datePicker.selectedDate);
  const showDatePicker = useSelector(state => state.datePicker.showDatePicker);
  const [repeat, setRepeat] = useState(todo.repeat || null);
  const [remindIntervalInMinutes, setRemindIntervalInMinutes] = useState(
    todo.remindIntervalInMinutes || DEFAULT_REMIND_INTERVAL_IN_MINUTES,
  );
  const [showRemindDropdown, setShowRemindDropdown] = useState(false);
  const [dontRemind, setDontRemind] = useState(todo.dontRemind);
  const [remindEnabled, enableRemind] = useState(todo.remindEnabled);
  const [text, setText] = useState(todo.text || '');

  useEffect(() => {
    if (showRemindDropdown || showDatePicker) {
      inputRef.current.blur();
    }
  }, [showRemindDropdown, showDatePicker]);
  function onInputTextChange(value) {
    setText(value);
  }
  function submit() {
    if (text) {
      onSubmit({
        ...todo,
        repeat,
        deadline,
        text,
        remindIntervalInMinutes,
        dontRemind,
        remindEnabled,
      });
    }
  }
  function onRepeat(type) {
    setRepeat(type);
  }
  function onRemind() {
    setShowRemindDropdown(true);
  }
  function changeRemindInterval(value) {
    setRemindIntervalInMinutes(value);
  }
  function closeRemindDropdown() {
    setShowRemindDropdown(false);
  }
  return (
    <>
      <Container style={styles.modalContent}>
        <PrimaryHeading text={title} />
        <Input
          ref={inputRef}
          value={text}
          onChangeText={onInputTextChange}
          placeholder={DEFAULT_TODO_TITLE_PLACEHOLDER}
        />
        <View style={styles.modalActions}>
          <View
            style={{
              ...theme.topBottomMargin(),
              ...theme.flex({
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }),
              width: '100%',
            }}>
            <DateSelectors selectedTodo={todo} />
            <TodoSettings
              showRemindDropdown={onRemind}
              dontRemind={dontRemind}
              remindIntervalInMinutes={remindIntervalInMinutes}
              remindEnabled={remindEnabled}
              onRepeat={onRepeat}
              repeat={repeat}
            />
          </View>
        </View>
        <SubmitButton
          style={{
            position: 'absolute',
            top: -30,
            right: 20,
          }}
          onPress={submit}
        />
      </Container>
      <DateTimePicker />
      {showRemindDropdown && (
        <DropdownModal
          dontRemind={dontRemind}
          setDontRemind={setDontRemind}
          remindEnabled={remindEnabled}
          enableRemind={enableRemind}
          remindIntervalInMinutes={remindIntervalInMinutes}
          changeRemindInterval={changeRemindInterval}
          closeRemindDropdown={closeRemindDropdown}
        />
      )}
    </>
  );
};

const TodoModal = ({todo, onSubmit, title}) => {
  const dispatch = useDispatch();
  function onCloseModal() {
    dispatch(closeModal());
  }
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      isVisible
      style={styles.modal}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}>
      <ModalContent title={title} onSubmit={onSubmit} todo={todo} />
    </Modal>
  );
};
TodoModal.defaultProps = {
  todo: {},
  onSubmit: () => {},
};
const createStyles = theme =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      width: '100%',
      margin: 0,
      height: '100%',
      flex: 1,
    },
    modalContent: {
      flex: 0.5,
      ...theme.flex({
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }),
      backgroundColor: theme.white,
      paddingTop: 20,
      position: 'relative',
    },
    modalActions: {
      ...theme.flex({
        flexDirection: 'column',
        alignItems: 'flex-start',
      }),
    },
  });
export default TodoModal;
