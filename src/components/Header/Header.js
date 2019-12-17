import React from 'react';
import * as Animatable from 'react-native-animatable';
import {View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

import DrawerControl from './DrawerControl';
import Search from './Search';
import useTheme from 'hooks/useTheme';
import MultiSelect from './MultiSelect';
import Caption from '../Typography/Caption';
import BackArrow from '../Icons/BackArrow';
import {iconStyle} from './constants';

const HeaderLeft = ({title, showBackButton}) => {
  return (
    <>
      {showBackButton ? (
        <BackArrow style={iconStyle} />
      ) : (
        <DrawerControl />
      )}
      <Caption text={title} />
    </>
  );
};

const Header = ({allTodos, hideSearch, title, showBackButton}) => {
  const theme = useTheme();
  const isMultiSelectEnable = useSelector(state => state.multiSelect.active);
  const searchOpened = useSelector(state => state.search.active);
  const fullWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        backgroundColor: theme.red,
        height: 60,
      }}>
      <View
        style={{
          ...theme.flex({
            justifyContent: 'space-between',
          }),
          ...theme.leftRightMargin(searchOpened ? 0 : 20),
          height: '100%',
          position: 'relative',
        }}>
        {isMultiSelectEnable ? (
          <MultiSelect allTodos={allTodos} />
        ) : (
          <>
            <Animatable.View
              transition="left"
              easing="linear"
              delay={100}
              duration={10}
              style={{
                ...theme.flex(),
                position: 'absolute',
                left: searchOpened ? -300 : 0,
              }}>
              <HeaderLeft showBackButton={showBackButton} title={title} />
            </Animatable.View>
            {!hideSearch && (
              <Animatable.View
                easing="linear"
                transition="width"
                duration={300}
                style={{
                  width: searchOpened ? fullWidth : 50,
                  position: 'absolute',
                  right: 0,
                }}>
                <Search />
              </Animatable.View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Header;
