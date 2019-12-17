import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {useDispatch} from 'react-redux';

import useSelector from 'hooks/useSelector';
import Screens from './screens';
import {setAppState} from 'actions/appState';

const Root = () => {
  const dispatch = useDispatch();
  const isAppActive = useSelector(state => state.appState.isAppActive);
  function handleAppStateChange(nextAppState) {
    const isNextStateActive = nextAppState === 'active';
    if (isNextStateActive) {
      if (!isAppActive) {
        dispatch(setAppState(true));
      }
    } else {
      if (isAppActive) {
        dispatch(setAppState(false));
      }
    }
  }
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  return <Screens />;
};

export default Root;
