import {ViewStyle, View} from 'react-native';

const flex = (values = {}): ViewStyle => {
  const defaultflex = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return {
    display: 'flex',
    ...defaultflex,
    ...values,
  } as ViewStyle;
};
const spaceBetween = (): ViewStyle => {
  return flex({
    justifyContent: 'space-between',
  });
};
const columnStart = (): ViewStyle => {
  return flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
  });
};
const columnEnd = (): ViewStyle => {
  return flex({
    flexDirection: 'column',
    alignItems: 'flex-end',
  });
};
const columnCenter = (): ViewStyle => {
  return flex({
    flexDirection: 'column',
    alignItems: 'center',
  });
};
const fullScreenCenter = (): ViewStyle => {
  return {
    flex: 1,
    ...flex({
      flexDirection: 'column',
      justifyContent: 'center',
    }),
  };
};
const leftRightMargin = (value = 20): ViewStyle => {
  return {
    marginLeft: value,
    marginRight: value,
  };
};
const topBottomMargin = (value = 20): ViewStyle => {
  return {
    marginTop: value,
    marginBottom: value,
  };
};

const leftRightPadding = (value = 20): ViewStyle => {
  return {
    paddingLeft: value,
    paddingRight: value,
  };
};
const topBottomPadding = (value = 20): ViewStyle => {
  return {
    paddingTop: value,
    paddingBottom: value,
  };
};

export {
  flex,
  columnStart,
  columnEnd,
  spaceBetween,
  columnCenter,
  fullScreenCenter,
  leftRightMargin,
  topBottomMargin,
  leftRightPadding,
  topBottomPadding,
};
