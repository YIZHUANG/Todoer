import React from 'react';
import Picker from '@react-native-community/datetimepicker';

const DatePicker = ({date, onSelectDate}) => {
  return (
    <Picker
      value={date}
      onChange={onSelectDate}
      is24Hour
      display="default"
      mode="date"
    />
  );
};

export default DatePicker;
