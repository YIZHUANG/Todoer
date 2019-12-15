import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Text, Input} from 'react-native-elements';
import {human} from 'react-native-typography';

import useTheme from '../../hooks/useTheme';
import {DEFAULT_REMIND_INTERVAL_IN_MINUTES} from '../../constants';
import CircleCheckBox from '../CircleCheckBox';

const DropdownModal = ({
  changeRemindInterval,
  remindIntervalInMinutes,
  closeRemindDropdown,
  remindEnabled,
  enableRemind,
  dontRemind,
  setDontRemind,
}) => {
  const theme = useTheme();

  function setRemind() {
    setDontRemind(false);
    enableRemind(true);
    closeRemindDropdown();
  }
  function disableRemind() {
    setDontRemind(true);
    enableRemind(false);
    closeRemindDropdown();
  }
  const isRemindEnable = !dontRemind && remindEnabled;
  function getDefaultRemindValue() {
    if (typeof remindIntervalInMinutes === 'number') {
      return remindIntervalInMinutes.toString();
    }
    if (dontRemind) {
      return DEFAULT_REMIND_INTERVAL_IN_MINUTES;
    }
    return remindIntervalInMinutes || '';
  }
  return (
    <Modal
      onBackButtonPress={closeRemindDropdown}
      onBackdropPress={closeRemindDropdown}
      isVisible
      style={{
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: theme.primary,
          ...theme.flex({
            alignItems: 'flex-start',
            paddingLeft: 30,
            paddingRight: 30,
            flexDirection: 'column',
          }),
          borderRadius: 4,
          ...theme.topBottomPadding(20),
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <Text
          style={{
            ...human.body,
            marginBottom: 10,
          }}>
          Reminder
        </Text>
        <View
          style={theme.flex({
            alignItems: 'center',
            justifyContent: 'flex-start',
          })}>
          <CircleCheckBox
            onPress={setRemind}
            checked={isRemindEnable}
            style={{
              marginRight: 15,
            }}
          />
          <Text>Remind me every</Text>
          <Input
            maxLength={4}
            inputStyle={{
              color: theme.dark,
            }}
            containerStyle={{
              width: 70,
            }}
            keyboardType="numeric"
            onChangeText={changeRemindInterval}
            textContentType="telephoneNumber"
            value={getDefaultRemindValue()}
          />
          <Text>minutes.</Text>
        </View>
        <View
          style={theme.flex({
            alignItems: 'center',
            justifyContent: 'flex-start',
          })}>
          <CircleCheckBox
            onPress={disableRemind}
            checked={!isRemindEnable}
            style={{
              marginRight: 15,
            }}
          />
          <Text>Don't remind me.</Text>
        </View>
      </View>
    </Modal>
  );
};

export default DropdownModal;
