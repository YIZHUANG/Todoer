import {put, takeLatest} from 'redux-saga/effects';
import {
  datePickerEffectActionTypes,
  datePickerMutationActions,
} from '../actions/datePicker';

function* setDateSaga(action) {
  yield put(datePickerMutationActions.closeDatePicker());
  if (action.selectedDate) {
    yield put(datePickerMutationActions.setDate(action.selectedDate));
    yield put(datePickerMutationActions.showTimePicker(action.selectedDate));
  }
}

function* setTimeSaga(action) {
  yield put(datePickerMutationActions.closeTimePicker());
  if (action.selectedDate) {
    yield put(datePickerMutationActions.setDate(action.selectedDate));
  }
}

const datePickerSagas = [
  takeLatest(datePickerEffectActionTypes.SELECT_DATE, setDateSaga),
  takeLatest(datePickerEffectActionTypes.SELECT_TIME, setTimeSaga),
];

export default datePickerSagas;
