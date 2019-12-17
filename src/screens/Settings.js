import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableHighlight,
  Alert,
  Linking,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import VersionCheck from 'react-native-version-check';

import useTheme from 'hooks/useTheme';
import Header from 'src/components/Header';
import SubHeading from 'src/components/Typography/SubHeading';
import {todoEffects} from 'actions/todo';

const noop = () => {};
const ContainerWithPressStatus = props => {
  const theme = useTheme();
  return <TouchableHighlight {...props} underlayColor={theme.lightGray} />;
};

const SettingItem = props => {
  const theme = useTheme();
  return (
    <ListItem
      Component={ContainerWithPressStatus}
      containerStyle={{
        backgroundColor: 'initial',
        ...theme.leftRightPadding(0),
        ...theme.topBottomPadding(20),
      }}
      contentContainerStyle={{
        ...theme.leftRightPadding(20),
      }}
      {...props}
    />
  );
};
const SettingHeading = ({text}) => {
  const theme = useTheme();
  return (
    <SubHeading
      style={{
        marginTop: 10,
        marginBottom: 0,
        ...theme.leftRightPadding(20),
        color: theme.orange,
        fontSize: 17,
      }}
      text={text}
    />
  );
};
const SettingSection = ({children, style = {}}) => {
  const theme = useTheme();
  const sectionSpacing = theme.topBottomMargin(5);
  return (
    <View
      style={{
        backgroundColor: 'white',
        elevation: 1,
        ...sectionSpacing,
        ...style,
      }}>
      {children}
    </View>
  );
};

const Settings = () => {
  const dispatch = useDispatch();

  const [updateNeeded, setUpdateNeeded] = useState(false);
  function onPress() {
    Alert.alert('Stay tune', 'This feature is coming in the next version');
  }
  useEffect(() => {
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        setUpdateNeeded(true);
      }
    });
  }, []);
  async function goToAppStore() {
    if (updateNeeded) {
      Linking.openURL(await VersionCheck.getStoreUrl());
    }
  }
  function clearCache() {
    dispatch(todoEffects.removeAllTodos());
  }
  return (
    <>
      <Header hideSearch showBackButton title="Settings" />
      <ScrollView>
        <SettingSection
          style={{
            marginTop: 0,
            paddingTop: 5,
          }}>
          <SettingHeading text="General" />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title="Language"
            subtitle="Auto"
          />
          <SettingItem onPress={onPress} title="Theme" subtitle="Red" />
        </SettingSection>
        <SettingSection>
          <SettingHeading text="Sync" />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title="Backup"
            subtitle="Backup your data to a local file"
          />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title="Restore"
            subtitle="Restore data from a backup file"
          />
          <SettingItem onPress={clearCache} title="Clear cache" />
        </SettingSection>
        <SettingSection>
          <SettingHeading text="About" />
          <SettingItem
            bottomDivider
            onPress={noop}
            title="Version"
            subtitle={VersionCheck.getCurrentVersion()}
          />
          <SettingItem
            bottomDivider
            onPress={goToAppStore}
            title="Check for update"
            subtitle={
              !updateNeeded
                ? 'Already latest version'
                : 'A newer version is available'
            }
          />
          <SettingItem bottomDivider onPress={noop} title="Privacy policy" />
          <SettingItem onPress={noop} title="Terms of service" />
        </SettingSection>
      </ScrollView>
    </>
  );
};

export default Settings;
