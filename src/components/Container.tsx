import React from 'react';
import {View, ViewStyle} from 'react-native';

import useTheme from 'hooks/useTheme';

const Container = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
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
