import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';

import Body from './Typography/Body';
import {Theme} from 'styles/theme';
import useTheme from 'hooks/useTheme';
import useTranslate from 'hooks/useTranslate';

const NoResult = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const t = useTranslate();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../static/magnifier.png')}
          style={styles.image}
        />
        <Body style={styles.bodyText} text={t('NO_RESULTS')} />
      </View>
    </View>
  );
};
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: theme.fullScreenCenter(),
    content: {
      ...theme.columnCenter(),
    },
    image: {
      width: 150,
      height: 150,
    },
    bodyText: {
      ...theme.topBottomMargin(5),
    },
  });

export default NoResult;
