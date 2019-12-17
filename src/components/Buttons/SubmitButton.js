import React from 'react';
import {Button, Icon} from 'react-native-elements';

import useTheme from 'hooks/useTheme';

const SubmitButton = ({loading, onPress, style = {}}) => {
  const theme = useTheme();
  return (
    <Button
      onPress={onPress}
      containerStyle={style}
      loading={loading}
      buttonStyle={{
        backgroundColor: theme.yellow,
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
