import React from 'react';
import * as Animatable from 'react-native-animatable';
import {View, Dimensions, StyleSheet} from 'react-native';

import useSelector from 'hooks/useSelector';
import DrawerControl from './DrawerControl';
import Search from './Search';
import useTheme from 'hooks/useTheme';
import MultiSelect from './MultiSelect';
import Caption from 'components/Typography/Caption';
import BackArrow from 'components/Icons/BackArrow';
import {iconStyle} from './constants';
import {Todos} from 'src/types';
import {HEADER_HEIGHT} from 'src/constants';
import {Theme} from 'styles/theme';

const HeaderLeft = ({
  title,
  showBackButton,
}: {
  title: string;
  showBackButton?: boolean;
}) => {
  return (
    <>
      {showBackButton ? <BackArrow style={iconStyle} /> : <DrawerControl />}
      <Caption text={title} />
    </>
  );
};

interface HeaderType {
  allTodos?: Todos;
  hideSearch?: boolean;
  title: string;
  showBackButton?: boolean;
}

const Header = ({allTodos, hideSearch, title, showBackButton}: HeaderType) => {
  const theme = useTheme();
  const isMultiSelectEnable = useSelector(state => state.multiSelect.active);
  const searchOpened = useSelector(state => state.search.active);
  const styles = createStyles(theme, searchOpened);
  return (
    <View
      style={{
        backgroundColor: theme.red,
        height: HEADER_HEIGHT,
      }}>
      <View style={styles.headerContent}>
        {isMultiSelectEnable ? (
          <MultiSelect allTodos={allTodos} />
        ) : (
          <>
            <Animatable.View
              transition="left"
              easing="linear"
              delay={100}
              duration={10}
              style={styles.headerLeft}>
              <HeaderLeft showBackButton={showBackButton} title={title} />
            </Animatable.View>
            {!hideSearch && (
              <Animatable.View
                easing="linear"
                transition="width"
                duration={300}
                style={styles.searchContainer}>
                <Search />
              </Animatable.View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme, searchOpened: boolean) =>
  StyleSheet.create({
    headerContent: {
      ...theme.spaceBetween(),
      ...theme.leftRightMargin(searchOpened ? 0 : 20),
      height: '100%',
      position: 'relative',
    },
    headerLeft: {
      ...theme.flex(),
      position: 'absolute',
      left: searchOpened ? -300 : 0,
    },
    searchContainer: {
      width: searchOpened ? Dimensions.get('window').width : 50,
      position: 'absolute',
      right: 0,
    },
  });

export default Header;
