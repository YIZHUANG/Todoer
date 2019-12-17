import React from 'react';
import {Text} from 'react-native';
import {human, systemWeights} from 'react-native-typography';

export const bodyTypes = {
  default: 'default',
  light: 'light',
};

const Body = ({variant = bodyTypes.default, text, style = {}}) => {
  const isDefault = variant === bodyTypes.default;
  const bodyStyle = {
    ...(isDefault ? human.body : human.bodyWhite),
    ...systemWeights.light,
    ...style,
  };
  return <Text style={bodyStyle}>{text}</Text>;
};

export default Body;
