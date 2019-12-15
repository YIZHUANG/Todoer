import {datePickerMutationTypes} from '../actions/datePicker';
import {CLOSE_MODAL} from '../actions/modal';

const initialState = {
  showDatePicker: false,
  showTimePicker: false,
  selectedDate: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case datePickerMutationTypes.SHOW_DATE_PICKER: {
      return {
        showDatePicker: true,
        selectedDate: action.selectedDate || '',
      };
    }
    case datePickerMutationTypes.SET_DATE: {
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    }
    case datePickerMutationTypes.CLOSE_DATE_PICKER: {
      return {
        ...state,
        showDatePicker: false,
      };
    }
    case datePickerMutationTypes.SHOW_TIME_PICKER: {
      return {
        ...state,
        showTimePicker: true,
        selectedDate: action.selectedDate,
      };
    }
    case datePickerMutationTypes.CLOSE_TIME_PICKER: {
      return {
        ...state,
        showTimePicker: false,
      };
    }
    case CLOSE_MODAL:
    case datePickerMutationTypes.CLOSE_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
