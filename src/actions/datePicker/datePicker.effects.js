import {datePickerEffectActionTypes} from './datePicker.constants';

export const selectDate = selectedDate => {
  return {
    type: datePickerEffectActionTypes.SELECT_DATE,
    selectedDate,
  };
};
const selectTime = selectedDate => {
  return {
    type: datePickerEffectActionTypes.SELECT_TIME,
    selectedDate,
  };
};
export const datePickerEffects = {
  selectDate,
  selectTime,
};
