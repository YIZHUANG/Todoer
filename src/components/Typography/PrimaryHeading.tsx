import React from 'react';
import {Text} from 'react-native';
import {systemWeights, human} from 'react-native-typography';

const PrimaryHeading = ({text}) => {
  return (
    <Text
      style={{
        ...human.title2Object,
        ...systemWeights.semibold,
      }}>
      {text}
    </Text>
  );
};

export default PrimaryHeading;
