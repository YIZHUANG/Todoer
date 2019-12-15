import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import endOfToday from 'date-fns/endOfToday';
import endOfTomorrow from 'date-fns/endOfTomorrow';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import format from 'date-fns/format';

import ButtonIcon from '../../Buttons/ButtonIcon';
import useTheme from '../../../hooks/useTheme';
import {datePickerMutationActions} from '../../../actions/datePicker';

const DateSelectors = ({selectedTodo}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.datePicker.selectedDate);
  const deadline = selectedDate || selectedTodo.deadline;

  const ifSelectedToday = isToday(new Date(deadline));
  const ifSelectedTomorrow = isTomorrow(new Date(deadline));
  const ifSelectedAnyOtherDate =
    deadline && !ifSelectedToday && !ifSelectedTomorrow;
  const otherDate =
    (ifSelectedAnyOtherDate && format(new Date(deadline), 'MM/dd/yyyy')) ||
    'Another date';
  function onShowDatePicker() {
    dispatch(datePickerMutationActions.showDatePicker(deadline));
  }
  function selectToday() {
    let newDate = endOfToday().toISOString();
    if (ifSelectedToday) {
      newDate = '';
    }
    dispatch(datePickerMutationActions.setDate(newDate));
  }
  function selectTomorrow() {
    let newDate = endOfTomorrow().toISOString();
    if (ifSelectedTomorrow) {
      newDate = '';
    }
    dispatch(datePickerMutationActions.setDate(newDate));
  }

  return (
    <View
      style={theme.flex({
        flexDirection: 'column',
        alignItems: 'flex-start',
      })}>
      <View style={theme.flex()}>
        <ButtonIcon
          active={ifSelectedToday}
          style={{
            marginRight: 30,
          }}
          onPress={selectToday}
          title="Today"
        />
        <ButtonIcon
          active={ifSelectedTomorrow}
          onPress={selectTomorrow}
          title="Tomorrow"
        />
      </View>
      <ButtonIcon
        active={ifSelectedAnyOtherDate}
        onPress={onShowDatePicker}
        title={otherDate}
      />
    </View>
  );
};

export default DateSelectors;
