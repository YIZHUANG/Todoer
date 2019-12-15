import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Picker from '@react-native-community/datetimepicker';
import {datePickerEffects} from '../actions/datePicker';

const DateTimePicker = () => {
  const {showDatePicker, showTimePicker, selectedDate} = useSelector(
    state => state.datePicker,
  );
  const date = selectedDate ? new Date(selectedDate) : new Date();
  const dispatch = useDispatch();
  function onSelectDate(e, correctDateButWithWrongTime) {
    // this lib returns wrong data;
    let newDate = '';
    if (e.type !== 'dismissed') {
      newDate = correctDateButWithWrongTime;
      const hours = date.getHours();
      const mins = date.getMinutes();
      newDate.setHours(hours);
      newDate.setMinutes(mins);
    }
    dispatch(datePickerEffects.selectDate(newDate));
  }
  function onSelectTime(e, wrongDateButWithCorrectTime) {
    let newDate = '';
    if (e.type !== 'dismissed') {
      // this lib returns wrong data;
      newDate = date;
      const hours = wrongDateButWithCorrectTime.getHours();
      const mins = wrongDateButWithCorrectTime.getMinutes();
      newDate.setHours(hours);
      newDate.setMinutes(mins);
    }
    dispatch(datePickerEffects.selectTime(newDate));
  }
  return (
    <>
      {showDatePicker && (
        <Picker
          value={date}
          onChange={onSelectDate}
          is24Hour
          display="default"
          mode="date"
        />
      )}
      {showTimePicker && (
        <Picker
          value={date}
          onChange={onSelectTime}
          is24Hour
          display="default"
          mode="time"
        />
      )}
    </>
  );
};

export default DateTimePicker;
