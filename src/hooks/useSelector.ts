import {useSelector as officialUseSelector} from 'react-redux';
import {AppState} from 'src/types';

function useSelector<S>(selector: (state: AppState) => S): S {
  return officialUseSelector((state: AppState) => selector(state));
}

export default useSelector;
