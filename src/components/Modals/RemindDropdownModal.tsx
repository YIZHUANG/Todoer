import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Input} from 'react-native-elements';
import {human} from 'react-native-typography';

import useTheme from 'hooks/useTheme';
import CircleCheckBox from 'components/CircleCheckBox';
import useTranslate from 'hooks/useTranslate';
import Body from 'components/Typography/Body';
import {Theme} from 'styles/theme';
import SubHeading from 'components/Typography/SubHeading';

const RemindDropdownModal = ({
  changeRemindInterval,
  remindIntervalInMinutes,
  closeRemindDropdown,
  remindEnabled,
  enableRemind,
}) => {
  const [remindInterval, setRemindInterval] = useState(remindIntervalInMinutes);
  const theme = useTheme();
  const t = useTranslate();
  const styles = createStyles(theme);
  function setRemind() {
    enableRemind(true);
    closeRemindDropdown();
  }
  function disableRemind() {
    enableRemind(false);
    closeRemindDropdown();
  }
  function onChangeRemindInterval(value: string) {
    setRemindInterval(value);
    changeRemindInterval(value);
  }
  function getDefaultRemindValue() {
    if (typeof remindInterval === 'number') {
      return remindInterval.toString();
    }
    return remindInterval;
  }
  return (
    <Modal
      onBackButtonPress={closeRemindDropdown}
      onBackdropPress={closeRemindDropdown}
      isVisible
      style={styles.container}>
      <View style={styles.content}>
        <SubHeading style={styles.heading} text={t('REMINDER')} />
        <View style={styles.remindMe}>
          <CircleCheckBox
            onPress={setRemind}
            checked={remindEnabled}
            style={styles.checkbox}
          />
          <Body text={t('REMIND_ME_EVERY')} />
          <Input
            maxLength={4}
            inputStyle={{
              color: theme.black,
            }}
            containerStyle={{
              width: 70,
            }}
            keyboardType="numeric"
            onChangeText={onChangeRemindInterval}
            textContentType="telephoneNumber"
            value={getDefaultRemindValue()}
          />
          <Body
            text={`${t('MINUTE', {
              lowerFirst: true,
              plural: remindIntervalInMinutes > 1,
            })}.`}
          />
        </View>
        <View style={styles.dontRemind}>
          <CircleCheckBox
            onPress={disableRemind}
            checked={!remindEnabled}
            style={styles.checkbox}
          />
          <Body text={t('DONT_REMIND_ME')} />
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    content: {
      backgroundColor: theme.white,
      ...theme.columnStart(),
      ...theme.leftRightPadding(30),
      borderRadius: 4,
      ...theme.topBottomPadding(20),
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    heading: {
      ...human.body,
      marginBottom: 10,
    },
    remindMe: theme.flex({
      alignItems: 'center',
      justifyContent: 'flex-start',
    }),
    dontRemind: theme.flex({
      alignItems: 'center',
      justifyContent: 'flex-start',
    }),
    checkbox: {
      marginRight: 15,
    },
  });

export default RemindDropdownModal;
