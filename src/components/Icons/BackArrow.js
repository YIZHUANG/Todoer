import React from 'react';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

import useTheme from 'hooks/useTheme';

const BackArrow = ({onPress, navigation, style = {}}) => {
  function goBack() {
    navigation.goBack();
  }
  const theme = useTheme();
  return (
    <Icon
      Component={TouchableWithoutFeedback}
      onPress={onPress || goBack}
      color={theme.black}
      type="feather"
      name="arrow-left"
      {...style}
    />
  );
};

export default withNavigation(BackArrow);
