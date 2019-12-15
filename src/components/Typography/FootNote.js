import React from 'react';
import {Text} from 'react-native';
import {systemWeights, iOSColors} from 'react-native-typography';

const FootNote = ({children, style = {}}) => {
  return (
    <Text
      style={{
        ...systemWeights.light,
        color: iOSColors.grey,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default FootNote;
