import React from 'react';
import {View} from 'react-native';
import endOfToday from 'date-fns/endOfToday';
import endOfTomorrow from 'date-fns/endOfTomorrow';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

import ButtonIcon from 'components/Buttons/ButtonIcon';
import useTheme from 'hooks/useTheme';
import useTranslate from 'hooks/useTranslate';

interface Props {
  deadline?: string;
  setSelectedDate: (_: string) => void;
  showDatePicker: () => void;
}

const DateSelectors = ({deadline, setSelectedDate, showDatePicker}: Props) => {
  const theme = useTheme();
  const t = useTranslate();
  const ifSelectedToday = deadline && isToday(new Date(deadline));
  const ifSelectedTomorrow = deadline && isTomorrow(new Date(deadline));
  const ifSelectedAnyOtherDate =
    deadline && !ifSelectedToday && !ifSelectedTomorrow;
  const otherDate =
    (ifSelectedAnyOtherDate && format(new Date(deadline), 'MM/dd/yyyy')) ||
    t('ANOTHER_DATE');

  function selectToday() {
    let newDate = endOfToday().toISOString();
    if (ifSelectedToday) {
      newDate = '';
    }
    setSelectedDate(newDate);
  }
  function selectTomorrow() {
    let newDate = endOfTomorrow().toISOString();
    if (ifSelectedTomorrow) {
      newDate = '';
    }
    setSelectedDate(newDate);
  }

  return (
    <View style={theme.columnStart()}>
      <View style={theme.flex()}>
        <ButtonIcon
          active={ifSelectedToday}
          style={{
            marginRight: 30,
          }}
          onPress={selectToday}
          title={t('TODAY')}
        />
        <ButtonIcon
          active={ifSelectedTomorrow}
          onPress={selectTomorrow}
          title={t('TOMORROW')}
        />
      </View>
      <ButtonIcon
        active={ifSelectedAnyOtherDate}
        onPress={showDatePicker}
        title={otherDate}
      />
    </View>
  );
};

export default DateSelectors;
