import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {systemWeights} from 'react-native-typography';

import FootNote from '../Typography/FootNote';
import useTheme from 'hooks/useTheme';

interface Props {
  iconName: string;
  iconColor: string;
  children: string;
}
const IconWithText = ({iconName, iconColor, children}: Props) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...theme.flex(),
        alignSelf: 'flex-start',
        marginTop: 10,
      }}>
      <Icon
        containerStyle={{
          marginRight: 5,
        }}
        size={20}
        color={iconColor}
        type="material-community"
        name={iconName}
      />
      <FootNote
        style={{
          ...systemWeights.light,
          color: theme.gray,
        }}>
        {children}
      </FootNote>
    </View>
  );
};

export default IconWithText;
