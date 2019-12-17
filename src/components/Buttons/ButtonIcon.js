import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {systemWeights} from 'react-native-typography';

import useTheme from 'hooks/useTheme';

export const buttonTypes = {
  disable: 'disable',
  default: 'default',
};

const ButtonIcon = ({
  style,
  title,
  onPress,
  active,
  variant = buttonTypes.disable,
  iconColor,
  iconName = 'calendar-check-outline',
}) => {
  const theme = useTheme();

  const isDefaultStyle = variant === buttonTypes.default;

  const iconStyle = {
    color: active || isDefaultStyle ? (iconColor || theme.blue) : theme.gray,
    ...(active || isDefaultStyle ? systemWeights.regular : systemWeights.light),
  };
  const titleStyle = {
    color: active ? theme.black : theme.gray,
    ...(active || isDefaultStyle ? systemWeights.regular : systemWeights.light),
  };
  return (
    <Button
      containerStyle={{
        ...theme.topBottomPadding(5),
        ...style,
      }}
      buttonStyle={{
        backgroundColor: theme.customGray,
        borderRadius: 10,
        padding: 10,
      }}
      titleStyle={{
        ...titleStyle,
      }}
      onPress={onPress}
      icon={
        <Icon
          iconStyle={{
            ...iconStyle,
          }}
          name={iconName}
          size={25}
          containerStyle={{
            marginRight: 10,
          }}
          type="material-community"
        />
      }
      title={title}
    />
  );
};

export default ButtonIcon;
