import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

import {iconStyle} from './constants';

const DrawerControl = props => {
  function toggleDrawer() {
    props.navigation.toggleDrawer();
  }
  return (
    <Icon
      {...iconStyle}
      Component={TouchableWithoutFeedback}
      type="material-community"
      onPress={toggleDrawer}
      name="menu"
    />
  );
};

export default withNavigation(DrawerControl);
