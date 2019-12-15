import React, {useEffect, useLayoutEffect} from 'react';
import {AppState, DeviceEventEmitter} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PushNotificationAndroid from 'react-native-push-notification';

import Screens from './screens';
import {setAppState} from './actions/appState';
import notificationService from './modules/notificationService';

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
