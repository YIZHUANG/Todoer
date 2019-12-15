import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {iOSColors, systemWeights} from 'react-native-typography';

import FootNote from '../Typography/FootNote';
import useTheme from '../../hooks/useTheme';

const IconWithText = ({iconName, iconColor, children}) => {
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
          color: iOSColors.grey,
        }}>
        {children}
      </FootNote>
    </View>
  );
};

export default IconWithText;
