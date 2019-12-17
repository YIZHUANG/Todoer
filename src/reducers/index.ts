import {combineReducers} from 'redux';

import search from './search';
import modal from './modal';
import todos from './todos';
import multiSelect from './multiSelect';
import appState from './appState';
import theme from './theme';
import localization from './localization';

export default combineReducers({
  modal,
  search,
  todos,
  multiSelect,
  appState,
  theme,
  localization,
});
