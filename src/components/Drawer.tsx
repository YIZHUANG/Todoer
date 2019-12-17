import * as React from 'react';
import {View, ScrollView, Text, SafeAreaView, StyleSheet} from 'react-native';
import {human, systemWeights} from 'react-native-typography';
import {ListItem, Divider} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {DrawerContentComponentProps} from 'react-navigation-drawer';

import useSelector from 'hooks/useSelector';
import useTheme from 'src/hooks/useTheme';
import {Theme} from 'styles/theme';
import {HEADER_HEIGHT} from 'src/constants';
import {RouteNames} from 'src/types';
import useTranslate from 'hooks/useTranslate';

const Drawer = ({navigation}: DrawerContentComponentProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const dueTodos = useSelector(state => state.todos.due);
  const ongoingTodos = useSelector(state => state.todos.ongoing);
  const pastTodos = useSelector(state => state.todos.past);
  const t = useTranslate();
  const totalActiveTodos = dueTodos.length + ongoingTodos.length;

  function navigate(routeName: RouteNames) {
    const navigateAction = NavigationActions.navigate({
      routeName,
    });
    navigation.dispatch(navigateAction);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>{t('TODOER')}</Text>
        </View>
        <View style={styles.navigationList}>
          <ListItem
            title={t('HOME')}
            onPress={() => navigate(RouteNames.Home)}
            leftIcon={{
              name: 'inbox',
              type: 'material-community',
              iconStyle: {
                color: theme.blue,
              },
            }}
            rightTitle={totalActiveTodos.toString()}
          />
          <ListItem
            title={t('COMPLETED')}
            onPress={() => navigate(RouteNames.Completed)}
            leftIcon={{
              name: 'calendar-multiple-check',
              type: 'material-community',
              iconStyle: {
                color: theme.green,
              },
            }}
            rightTitle={pastTodos.length.toString()}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.navigationList}>
          <ListItem
            onPress={() => navigate(RouteNames.Settings)}
            title={t('SETTINGS')}
            leftIcon={{name: 'settings', type: 'material-community'}}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    brandContainer: {
      ...theme.columnStart(),
      paddingLeft: 20,
      backgroundColor: theme.red,
      height: HEADER_HEIGHT,
    },
    brand: {
      ...human.bodyWhiteObject,
      ...systemWeights.bold,
    },
    navigationList: {
      ...theme.topBottomPadding(10),
    },
    divider: {
      backgroundColor: theme.black,
      height: 0.3,
    },
  });

export default Drawer;
