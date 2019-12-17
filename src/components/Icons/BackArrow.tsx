import React from 'react';
import {TextStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {NavigationDrawerScreenProps} from 'react-navigation-drawer';

import useTheme from 'hooks/useTheme';

interface Props {
  onPress?: () => void;
  style?: TextStyle;
  navigation: NavigationDrawerScreenProps['navigation'];
}
const BackArrow = ({onPress, navigation, style = {}}: Props) => {
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
