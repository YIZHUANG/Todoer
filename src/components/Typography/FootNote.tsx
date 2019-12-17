import React from 'react';
import {Text} from 'react-native';
import {systemWeights} from 'react-native-typography';

import useTheme from 'src/hooks/useTheme';

const FootNote = ({children, style = {}}) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        ...systemWeights.light,
        color: theme.gray,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default FootNote;
