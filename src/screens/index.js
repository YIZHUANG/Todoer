import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from './Home';
import Completed from './Completed';
import Settings from './Settings';
import Drawer from '../components/Drawer';

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Completed: {
      screen: Completed,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    contentComponent: props => <Drawer {...props} />,
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerWidth: 270,
    contentOptions: {
      activeColor: 'red',
    },
  },
);

export default createAppContainer(AppNavigator);
