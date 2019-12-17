import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';

import Body from './Typography/Body';
import {Theme} from 'styles/theme';
import useTheme from 'hooks/useTheme';
import useTranslate from 'hooks/useTranslate';

const EmptyTodos = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const t = useTranslate();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../static/thinking.png')}
          style={styles.image}
        />
        <Body style={styles.bodyText} text={t('WHAT_IS_ON_YOUR_MIND')} />
        <Body style={styles.bodyText} text={t('START_ADDING_TODO')} />
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

export default EmptyTodos;
