import {combineReducers} from 'redux';

import search from './search';
import modal from './modal';
import todos from './todos';
import datePicker from './datePicker';
import multiSelect from './multiSelect';
import appState from './appState';

export default combineReducers({
  modal,
  search,
  todos,
  datePicker,
  multiSelect,
  appState,
});
