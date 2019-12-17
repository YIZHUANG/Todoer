import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Alert,
  Linking,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import VersionCheck from 'react-native-version-check';

import useTheme from 'hooks/useTheme';
import Header from 'src/components/Header';
import {todoEffects} from 'actions/todo';
import ButtonWithPressStatus from 'components/Buttons/ButtonWithPressStatus';
import ListHeading from 'components/Typography/ListHeading';
import useTranslate from 'hooks/useTranslate';

const noop = () => {};

const SettingItem = props => {
  const theme = useTheme();
  return (
    <ListItem
      Component={ButtonWithPressStatus}
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

const SettingSection = ({
  children,
  style = {},
  disableBoxShadow,
}: {
  style?: ViewStyle;
  children: React.ReactNode;
  disableBoxShadow?: boolean;
}) => {
  const theme = useTheme();
  const sectionSpacing = theme.topBottomMargin(5);
  return (
    <View
      style={{
        backgroundColor: theme.white,
        elevation: disableBoxShadow ? 0 : 1,
        ...sectionSpacing,
        ...style,
      }}>
      {children}
    </View>
  );
};

const SettingHeading = ({text}) => {
  const theme = useTheme();
  return (
    <ListHeading
      text={text}
      style={{
        marginTop: 10,
        marginBottom: 0,
        ...theme.leftRightPadding(20),
      }}
    />
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const t = useTranslate();
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
      <Header hideSearch showBackButton title={t('SETTINGS')} />
      <ScrollView>
        <SettingSection style={styles.container}>
          <SettingHeading text={t('GENEARAL')} />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title={t('LANGUAGE')}
            subtitle={t('AUTO')}
          />
          <SettingItem onPress={onPress} title={t('THEME')} subtitle="Red" />
        </SettingSection>
        <SettingSection>
          <SettingHeading text={t('SYNC')} />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title={t('BACKUP')}
            subtitle={t('BACKUP_FILE')}
          />
          <SettingItem
            bottomDivider
            onPress={onPress}
            title={t('RESTORE')}
            subtitle={t('RESTORE_FILE')}
          />
          <SettingItem onPress={clearCache} title={t('CLEAR_CACHE')} />
        </SettingSection>
        <SettingSection disableBoxShadow>
          <SettingHeading text={t('ABOUT')} />
          <SettingItem
            bottomDivider
            onPress={noop}
            title={t('VERSION')}
            subtitle={VersionCheck.getCurrentVersion()}
          />
          <SettingItem
            bottomDivider
            onPress={goToAppStore}
            title={t('CHECK_FOR_UPDATE')}
            subtitle={
              !updateNeeded
                ? t('ALREADY_LATEST_VERSION')
                : t('NEWER_VERSION_AVIAILABLE')
            }
          />
          <SettingItem
            bottomDivider
            onPress={noop}
            title={t('PRIVACY_POLICY')}
          />
          <SettingItem onPress={noop} title={t('TERMS_OF_SERVICE')} />
        </SettingSection>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 5,
  },
});

export default Settings;
