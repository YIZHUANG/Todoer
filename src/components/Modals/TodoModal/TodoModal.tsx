import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Input} from 'react-native-elements';

import useTheme from 'hooks/useTheme';
import DateSelectors from './DateSelectors';
import PrimaryHeading from 'components/Typography/PrimaryHeading';
import Container from 'components/Container';
import TodoSettings from './TodoSettings';
import SubmitButton from 'components/Buttons/SubmitButton';
import useSetRemindDropdown from 'hooks/useSetRemindDropdown';
import useDateTimePicker from 'hooks/useDateTimePicker';
import {Todo, CreateTodo, RepeatTypes, ModalTypes} from 'src/types';
import useSelector from 'hooks/useSelector';
import {Theme} from 'styles/theme';
import useTranslate from 'hooks/useTranslate';

interface Props {
  todo: Todo;
  onSubmit: (_: CreateTodo) => void;
  title: string;
}

const ModalContent = ({todo = null, onSubmit, title}: Props) => {
  const theme = useTheme();
  const inputRef: any = useRef();
  const styles = createStyles(theme);
  const t = useTranslate();
  const [deadline, setSelectedDate, showDatePicker] = useDateTimePicker(
    todo,
    true,
  );
  const [repeat, setRepeat] = useState(todo?.repeat || null);
  const [
    remindIntervalInMinutes,
    remindEnabled,
    showRemindDropdown,
  ] = useSetRemindDropdown(todo);
  const [text, setText] = useState(todo?.text || '');
  const currentModals = useSelector(state => state.modal.modals);
  const isDatePickerActive = currentModals.find(
    modal => modal.name === ModalTypes.DATE_PICKER,
  );
  const isRemindDropdownActive = currentModals.find(
    modal => modal.name === ModalTypes.REMIND_DROPDOWN_MODAL,
  );

  useEffect(() => {
    if (isDatePickerActive || isRemindDropdownActive) {
      inputRef.current.blur();
    }
  }, [isDatePickerActive, isRemindDropdownActive]);
  function onInputTextChange(value: string) {
    setText(value);
  }
  function submit() {
    if (text) {
      const todoData = {
        repeat,
        deadline,
        text,
        remindIntervalInMinutes,
        remindEnabled,
      };
      if (todo) {
        onSubmit({
          ...todo,
          ...todoData,
        });
      } else {
        onSubmit(todoData);
      }
    }
  }
  function onRepeat(type: RepeatTypes) {
    setRepeat(type);
  }
  return (
    <Container>
      <PrimaryHeading text={title} />
      <Input
        ref={inputRef}
        containerStyle={styles.inputContainer}
        value={text}
        onChangeText={onInputTextChange}
        placeholder={t('DEFAULT_TODO_TITLE_PLACEHOLDER')}
      />
      <View style={styles.modalActions}>
        <View
          style={{
            ...theme.topBottomMargin(),
            ...theme.columnStart(),
            width: '100%',
          }}>
          <DateSelectors
            setSelectedDate={setSelectedDate}
            deadline={deadline}
            showDatePicker={showDatePicker}
          />
          <TodoSettings
            showRemindDropdown={showRemindDropdown}
            remindIntervalInMinutes={remindIntervalInMinutes}
            remindEnabled={remindEnabled}
            onRepeat={onRepeat}
            repeat={repeat}
          />
        </View>
      </View>
      <SubmitButton style={styles.submitButton} onPress={submit} />
    </Container>
  );
};

const TodoModal = ({
  todo,
  onSubmit,
  title,
  onClose,
}: Props & {onClose: () => void}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      isVisible
      avoidKeyboard
      style={styles.modal}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-500}
        style={styles.modalContent}
        behavior="padding">
        <ModalContent title={title} onSubmit={onSubmit} todo={todo} />
      </KeyboardAvoidingView>
    </Modal>
  );
};
TodoModal.defaultProps = {
  todo: {},
  onSubmit: () => {},
};
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      maxHeight: '90%',
      height: 350,
      backgroundColor: theme.white,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      position: 'relative',
    },
    modalActions: theme.columnStart(),
    inputContainer: {
      width: Dimensions.get('window').width - 40,
    },
    submitButton: {
      position: 'absolute',
      top: -30,
      right: 20,
    },
  });
export default TodoModal;
