import React from 'react';
import {View} from 'react-native';

import SubHeading from '../../Typography/SubHeading';
import useTheme from 'hooks/useTheme';
import ButtonIcon, {buttonTypes} from '../../Buttons/ButtonIcon';
import {RepeatTypes} from '../../../constants';

function minutesToPural(minutes) {
  return minutes > 1 ? 'minutes' : 'minute';
}

const RemindButton = ({
  dontRemind,
  remindIntervalInMinutes,
  remindEnabled,
  showRemindDropdown,
}) => {
  const remind = remindIntervalInMinutes && remindEnabled;
  const theme = useTheme();
  function getRemindSelection() {
    if (dontRemind) {
      return "Don't remind";
    }
    if (remind) {
      return `Every ${remindIntervalInMinutes} ${minutesToPural(
        remindIntervalInMinutes,
      )}`;
    }
    return 'Remind me';
  }
  return (
    <ButtonIcon
      iconName="bell-outline"
      variant={buttonTypes.default}
      iconColor={theme.green}
      active={remind}
      style={{
        marginRight: 30,
      }}
      title={getRemindSelection()}
      onPress={showRemindDropdown}
    />
  );
};

// todos: support weekly.
const RepeatEveryDayButton = ({repeat, onRepeat}) => {
  const theme = useTheme();
  const isRepeating = repeat === RepeatTypes.DAILY;
  function onRepeatEveryday() {
    if (isRepeating) {
      onRepeat(null);
    } else {
      onRepeat(RepeatTypes.DAILY);
    }
  }
  return (
    <ButtonIcon
      iconName={isRepeating ? 'check' : 'repeat'}
      variant={buttonTypes.default}
      iconColor={isRepeating ? theme.green : theme.red}
      title="Repeat everyday"
      active={isRepeating}
      onPress={onRepeatEveryday}
    />
  );
};

const TodoSettings = ({
  showRemindDropdown,
  dontRemind,
  remindIntervalInMinutes,
  remindEnabled,
  repeat,
  onRepeat,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...theme.flex({
          flexDirection: 'column',
          alignItems: 'flex-start',
        }),
        ...theme.topBottomMargin(10),
      }}>
      <SubHeading text="Settings" />
      <View style={{...theme.flex(), marginTop: 10}}>
        <RemindButton
          showRemindDropdown={showRemindDropdown}
          dontRemind={dontRemind}
          remindIntervalInMinutes={remindIntervalInMinutes}
          remindEnabled={remindEnabled}
        />
        <RepeatEveryDayButton repeat={repeat} onRepeat={onRepeat} />
      </View>
    </View>
  );
};

export default TodoSettings;
