import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import uuid4 from 'uuid/v4';
import {AndroidEvent} from '@react-native-community/datetimepicker';

import {openModal, closeModal} from 'actions/modal';
import DatePicker from 'components/Modals/DatePicker';
import TimePicker from 'components/Modals/TimePicker';
import {ModalTypes, Todo} from 'src/types';

const useDateTimePicker = (
  todo: Todo = null,
  showTimePickerAsWell: boolean,
): [string, (_:string) => void, () => void, (_:Date) => void] => {
  const dispatch = useDispatch();
  const datePickerKey = useRef(uuid4());
  const timePickerKey = useRef(uuid4());
  const [selectedDate, setSelectedDate] = useState<string>(
    todo?.deadline || '',
  );

  const date = selectedDate ? new Date(selectedDate) : new Date();

  function showDatePicker() {
    dispatch(
      openModal({
        key: datePickerKey.current,
        name: ModalTypes.DATE_PICKER,
        component: <DatePicker date={date} onSelectDate={onSelectDate} />,
      }),
    );
  }
  function closeDatePicker() {
    dispatch(closeModal(datePickerKey.current));
  }

  function showTimePicker(date: Date) {
    function onSelectTime(e: AndroidEvent, wrongDateButWithCorrectTime: Date) {
      closeTimePicker();
      if (e.type !== 'dismissed') {
        // this lib returns wrong data;
        const newDate = date;
        const hours = wrongDateButWithCorrectTime.getHours();
        const mins = wrongDateButWithCorrectTime.getMinutes();
        newDate.setHours(hours);
        newDate.setMinutes(mins);
        setSelectedDate(newDate.toISOString());
      }
    }
    dispatch(
      openModal({
        key: timePickerKey.current,
        name: ModalTypes.TIME_PICKER,
        component: <TimePicker date={date} onSelectTime={onSelectTime} />,
      }),
    );
  }

  function closeTimePicker() {
    dispatch(closeModal(timePickerKey.current));
  }

  function onSelectDate(e: AndroidEvent, correctDateButWithWrongTime: Date) {
    // this lib returns wrong data;
    closeDatePicker();
    if (e.type !== 'dismissed') {
      const newDate = correctDateButWithWrongTime;
      const hours = date.getHours();
      const mins = date.getMinutes();
      newDate.setHours(hours);
      newDate.setMinutes(mins);
      setSelectedDate(newDate.toISOString());
      if (showTimePickerAsWell) {
        showTimePicker(newDate);
      }
    }
  }

  return [selectedDate, setSelectedDate, showDatePicker, showTimePicker];
};

export default useDateTimePicker;
