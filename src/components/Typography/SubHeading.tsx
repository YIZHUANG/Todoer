import React from 'react';
import {Text} from 'react-native';
import {systemWeights, human} from 'react-native-typography';

const SubHeading = ({text, style = {}}) => {
  return (
    <Text
      style={{
        ...human.title3Object,
        ...systemWeights.semibold,
        fontSize: 20,
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default SubHeading;
