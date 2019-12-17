import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {ViewStyle} from 'react-native';

import useTheme from 'hooks/useTheme';

const SubmitButton = ({
  onPress,
  style = {},
}: {
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const theme = useTheme();
  return (
    <Button
      onPress={onPress}
      containerStyle={style}
      buttonStyle={{
        backgroundColor: theme.yellow,
        borderRadius: 50,
        padding: 20,
      }}
      icon={
        <Icon
          type="material-community"
          name="check"
          size={20}
          color={theme.white}
        />
      }
    />
  );
};

export default SubmitButton;
