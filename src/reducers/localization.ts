import en from 'static/locales/en';
import {LocaleTypes} from 'src/types';
import {CHANGE_LOCALE} from 'actions/localization';

interface State {
  translations: {
    english: typeof en; // for now
    chinese: null;
  };
  selectedLocale: LocaleTypes;
}

const initialState: State = {
  translations: {
    english: en,
    chinese: null,
  },
  selectedLocale: LocaleTypes.ENGLISH,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        selectedLanguage: action.locale,
      };
    default:
      return state;
  }
};

export default reducer;
