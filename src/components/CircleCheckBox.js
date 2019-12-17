import React from 'react';
import {CheckBox} from 'react-native-elements';

import useTheme from 'hooks/useTheme';

const CircleCheckBox = ({onPress, checked, style = {}}) => {
  const theme = useTheme();
  return (
    <CheckBox
      onPress={onPress}
      containerStyle={{
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        ...style,
      }}
      checkedColor={theme.blue}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={checked}
    />
  );
};

export default CircleCheckBox;
