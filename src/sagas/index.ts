import {all} from 'redux-saga/effects';

import todoSagas from './todoSaga';
import notificationSagas from './notificationSaga';

export default function* rootSaga() {
  yield all([...notificationSagas, ...todoSagas]);
}
