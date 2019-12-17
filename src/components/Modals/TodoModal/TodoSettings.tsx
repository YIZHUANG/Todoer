import React from 'react';
import {View} from 'react-native';

import SubHeading from 'components/Typography/SubHeading';
import useTheme from 'hooks/useTheme';
import ButtonIcon, {ButtonTypes} from 'components/Buttons/ButtonIcon';
import {RepeatTypes} from 'src/types';
import useTranslate from 'hooks/useTranslate';

const RemindButton = ({
  remindIntervalInMinutes,
  remindEnabled,
  showRemindDropdown,
}) => {
  const remind = remindIntervalInMinutes && remindEnabled;
  const theme = useTheme();
  const t = useTranslate();
  function getRemindSelection() {
    if (!remindEnabled) {
      return t('DONT_REMIND');
    }
    if (remind) {
      return `${t('EVERY')} ${remindIntervalInMinutes} ${t('MINUTE', {
        plural: remindIntervalInMinutes > 1,
      })}`;
    }
    return t('REMIND_ME');
  }
  return (
    <ButtonIcon
      iconName="bell-outline"
      variant={ButtonTypes.default}
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
  const t = useTranslate();
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
      variant={ButtonTypes.default}
      iconColor={isRepeating ? theme.green : theme.red}
      title={t('REPEAT_EVERYDAY')}
      active={isRepeating}
      onPress={onRepeatEveryday}
    />
  );
};

const TodoSettings = ({
  showRemindDropdown,
  remindIntervalInMinutes,
  remindEnabled,
  repeat,
  onRepeat,
}) => {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <View
      style={{
        ...theme.columnStart(),
        ...theme.topBottomMargin(10),
      }}>
      <SubHeading text={t('SETTINGS')} />
      <View style={{...theme.flex(), marginTop: 10}}>
        <RemindButton
          showRemindDropdown={showRemindDropdown}
          remindIntervalInMinutes={remindIntervalInMinutes}
          remindEnabled={remindEnabled}
        />
        <RepeatEveryDayButton repeat={repeat} onRepeat={onRepeat} />
      </View>
    </View>
  );
};

export default TodoSettings;
