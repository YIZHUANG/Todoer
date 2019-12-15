import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {iOSColors} from 'react-native-typography';

const SubmitButton = ({loading, onPress, style = {}}) => {
  return (
    <Button
      onPress={onPress}
      containerStyle={style}
      loading={loading}
      buttonStyle={{
        backgroundColor: iOSColors.yellow,
        borderRadius: 50,
        padding: 20,
      }}
      icon={
        <Icon type="material-community" name="check" size={20} color="white" />
      }
    />
  );
};

export default SubmitButton;
