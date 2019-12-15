import React from 'react';
import {CheckBox} from 'react-native-elements';
import {iOSColors} from 'react-native-typography';

const CircleCheckBox = ({onPress, checked, style = {}}) => {
  return (
    <CheckBox
      onPress={onPress}
      containerStyle={{
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        ...style,
      }}
      checkedColor={iOSColors.blue}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={checked}
    />
  );
};

export default CircleCheckBox;
