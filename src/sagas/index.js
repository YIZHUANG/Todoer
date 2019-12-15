import {all} from 'redux-saga/effects';

import todoSagas from './todoSaga';
import datePickerSagas from './datePickerSaga';
import notificationSagas from './notificationSaga';

export default function* rootSaga() {
  yield all([...notificationSagas, ...todoSagas, ...datePickerSagas]);
}
