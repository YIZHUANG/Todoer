import * as React from 'react';
import {View, ScrollView, Text, SafeAreaView, StyleSheet} from 'react-native';
import {iOSColors, human, systemWeights} from 'react-native-typography';
import {ListItem, Divider} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {useSelector} from 'react-redux';

import useTheme from '../hooks/useTheme';

const Drawer = ({navigation}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const dueTodos = useSelector(state => state.todos.due);
  const ongoingTodos = useSelector(state => state.todos.ongoing);
  const pastTodos = useSelector(state => state.todos.past);

  const totalActiveTodos = dueTodos.length + ongoingTodos.length;

  function navigate(routeName) {
    const navigateAction = NavigationActions.navigate({
      routeName,
    });
    navigation.dispatch(navigateAction);
  }

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>Todoer</Text>
        </View>
        <View style={styles.navigationList}>
          <ListItem
            title="Home"
            onPress={() => navigate('Home')}
            leftIcon={{
              name: 'inbox',
              type: 'material-community',
              iconStyle: {
                color: iOSColors.blue,
              },
            }}
            rightTitle={totalActiveTodos.toString()}
          />
          <ListItem
            title="Completed"
            onPress={() => navigate('Completed')}
            leftIcon={{
              name: 'calendar-multiple-check',
              type: 'material-community',
              iconStyle: {
                color: iOSColors.green,
              },
            }}
            rightTitle={pastTodos.length.toString()}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.navigationList}>
          <ListItem
            onPress={() => navigate('Settings')}
            title="Settings"
            leftIcon={{name: 'settings', type: 'material-community'}}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    brandContainer: {
      ...theme.flex({
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 20,
      }),
      backgroundColor: iOSColors.red,
      height: 60,
    },
    brand: {
      ...human.bodyWhiteObject,
      ...systemWeights.bold
    },
    navigationList: {
      ...theme.topBottomPadding(10),
    },
    divider: {
      backgroundColor: iOSColors.black,
      height: 0.3,
    },
  });

export default Drawer;
