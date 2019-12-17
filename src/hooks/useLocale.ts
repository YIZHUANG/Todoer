import {useDispatch} from 'react-redux';
import useSelector from './useSelector';
import {LocaleTypes} from 'src/types';
import {changeLocale} from 'actions/localization';

const useLocale = (): [LocaleTypes, (_: LocaleTypes) => void] => {
  const selectedLocale: LocaleTypes = useSelector(
    state => state.localization.selectedLocale,
  );
  function onChangeLocale(locale: LocaleTypes) {
    const dispatch = useDispatch();
    dispatch(changeLocale(locale));
  }
  return [selectedLocale, onChangeLocale];
};

export default useLocale;
