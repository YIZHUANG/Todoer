import React from 'react';
import {Text} from 'react-native';
import {systemWeights, human} from 'react-native-typography';

const Caption = ({text, style = {}}) => {
  return (
    <Text
      style={{
        ...human.bodyWhiteObject,
        ...systemWeights.bold,
        fontSize: 20,
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default Caption;
