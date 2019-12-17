import React from 'react';
import {View} from 'react-native';

import useTheme from 'hooks/useTheme';

const Container = ({children, style}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...theme.leftRightPadding(),
        ...theme.topBottomPadding(),
        ...style,
      }}>
      {children}
    </View>
  );
};

export default Container;
