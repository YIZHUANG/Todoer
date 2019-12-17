import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import Home from './Home';
import Completed from './Completed';
import Settings from './Settings';
import Drawer from 'src/components/Drawer';
import {RouteNames} from 'src/types';

const AppNavigator = createDrawerNavigator(
  {
    [RouteNames.Home]: {
      screen: Home,
    },
    [RouteNames.Completed]: {
      screen: Completed,
    },
    [RouteNames.Settings]: {
      screen: Settings,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    } as any,
    contentComponent: (props: DrawerContentComponentProps) => (
      <Drawer {...props} />
    ),
    initialRouteName: RouteNames.Home,
    drawerPosition: 'left',
    drawerWidth: 270,
    contentOptions: {
      activeColor: 'red',
    },
  },
);

export default createAppContainer(AppNavigator);
