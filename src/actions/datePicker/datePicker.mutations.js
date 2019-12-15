import {datePickerMutationTypes} from './datePicker.constants';

const showDatePicker = selectedDate => {
  return {
    type: datePickerMutationTypes.SHOW_DATE_PICKER,
    selectedDate,
  };
};
const showTimePicker = selectedDate => {
  return {
    type: datePickerMutationTypes.SHOW_TIME_PICKER,
    selectedDate,
  };
};
const setDate = selectedDate => {
  return {
    type: datePickerMutationTypes.SET_DATE,
    selectedDate,
  };
};
const closeDatePicker = () => {
  return {
    type: datePickerMutationTypes.CLOSE_DATE_PICKER,
  };
};
const closeTimePicker = () => {
  return {
    type: datePickerMutationTypes.CLOSE_TIME_PICKER,
  };
};
export const datePickerMutationActions = {
  showDatePicker,
  showTimePicker,
  setDate,
  closeDatePicker,
  closeTimePicker,
};
