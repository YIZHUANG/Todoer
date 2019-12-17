import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const ScrollContainer = ({children}) => {
  const styles = createStyles();
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
  });

export default ScrollContainer;
