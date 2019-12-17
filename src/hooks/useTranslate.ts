import lowerFirst from 'lodash/lowerFirst';
import capitalize from 'lodash/capitalize';

import useLocale from './useLocale';
import useSelector from './useSelector';

interface Config {
  lowerFirst?: boolean;
  upperFirst?: boolean;
  plural?: boolean;
}

const useTranslate = () => {
  const [selectedLocale] = useLocale();
  const translations = useSelector(state => state.localization.translations)[
    selectedLocale
  ];

  function translate(key: keyof typeof translations, config?: Config) {
    const showLowerFirst = config?.lowerFirst;
    const showUpperFirst = config?.upperFirst;
    const plural = config?.plural;
    let word = translations[key] || '';
    if (plural) {
      word = translations[`${key}S`];
    }
    if (showLowerFirst) {
      word = lowerFirst(word);
    }
    if (showUpperFirst) {
      word = capitalize(word);
    }
    return word;
  }
  return translate;
};

export default useTranslate;
