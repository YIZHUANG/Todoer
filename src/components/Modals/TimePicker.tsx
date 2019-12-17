import React from 'react';
import Picker from '@react-native-community/datetimepicker';

const TimePicker = ({date, onSelectTime}) => {
  return (
    <Picker
      value={date}
      onChange={onSelectTime}
      is24Hour
      display="default"
      mode="time"
    />
  );
};

export default TimePicker;
