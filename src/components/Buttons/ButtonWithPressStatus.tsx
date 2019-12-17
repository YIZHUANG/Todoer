import React from 'react';
import {TouchableHighlight} from 'react-native';
import useTheme from 'hooks/useTheme';

const ButtonWithPressStatus = (props: any) => {
  const theme = useTheme();
  return <TouchableHighlight {...props} underlayColor={theme.lightGray} />;
};

export default ButtonWithPressStatus;
