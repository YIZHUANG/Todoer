import {iOSColors} from 'react-native-typography';
import {
  flex,
  leftRightMargin,
  topBottomMargin,
  leftRightPadding,
  topBottomPadding,
  columnStart,
  columnEnd,
  columnCenter,
  fullScreenCenter,
  spaceBetween,
} from './utilities';
import {ViewStyle} from 'react-native';

const colors: Colors = {
  ...iOSColors,
  light: '#f4f6f8',
};

interface Colors {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  tealBlue: string;
  blue: string;
  purple: string;
  pink: string;
  white: string;
  customGray: string;
  lightGray: string;
  lightGray2: string;
  midGray: string;
  gray: string;
  light: string;
  black: string;
}

interface Utilites {
  flex: (values?: ViewStyle) => ViewStyle;
  columnStart: () => ViewStyle;
  columnEnd: () => ViewStyle;
  fullScreenCenter: () => ViewStyle;
  columnCenter: () => ViewStyle;
  spaceBetween: () => ViewStyle;
  leftRightMargin: (value?: number) => ViewStyle;
  topBottomMargin: (value?: number) => ViewStyle;
  leftRightPadding: (value?: number) => ViewStyle;
  topBottomPadding: (value?: number) => ViewStyle;
}

export type Theme = Colors & Utilites;

const theme: Theme = {
  ...colors,
  flex,
  fullScreenCenter,
  columnCenter,
  spaceBetween,
  leftRightMargin,
  topBottomMargin,
  leftRightPadding,
  columnStart,
  columnEnd,
  topBottomPadding,
};

export default theme;
