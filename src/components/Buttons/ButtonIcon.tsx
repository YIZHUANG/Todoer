import React from 'react';
import {ViewStyle} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {systemWeights} from 'react-native-typography';

import useTheme from 'hooks/useTheme';

export enum ButtonTypes {
  disable = 'disable',
  default = 'default',
}

interface Props {
  style?: ViewStyle;
  title: string;
  onPress: () => void;
  active?: boolean;
  variant?: ButtonTypes;
  iconColor?: string;
  iconName?: string;
}
const ButtonIcon = ({
  style,
  title,
  onPress,
  active,
  variant = ButtonTypes.disable,
  iconColor,
  iconName = 'calendar-check-outline',
}: Props) => {
  const theme = useTheme();

  const isDefaultStyle = variant === ButtonTypes.default || active;
  const defaultIconColor = iconColor || theme.blue;

  const weight = isDefaultStyle ? systemWeights.regular : systemWeights.light;
  const iconStyle = {
    color: isDefaultStyle ? defaultIconColor : theme.gray,
    ...weight,
  };
  const titleStyle = {
    color: active ? theme.black : theme.gray,
    ...weight,
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
