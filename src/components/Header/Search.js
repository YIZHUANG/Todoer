import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {toggleSearch, onSearch} from 'actions/search';
import useTheme from 'hooks/useTheme';
import BackArrow from '../Icons/BackArrow';

const Search = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const ref = React.useRef(null);
  const keyword = useSelector(state => state.search.keyword);
  const active = useSelector(state => state.search.active);

  React.useEffect(() => {
    if (!active) {
      ref.current.cancel();
      ref.current.blur();
    }
  }, [active]);

  // todo...
  const inActiveStyle = {
    containerStyle: {
      backgroundColor: theme.secondary,
      borderBottomColor: theme.secondary,
      borderTopColor: theme.secondary,
      height: '100%',
    },
    inputContainerStyle: {
      backgroundColor: theme.secondary,
    },
  };
  const activeStyle = {
    containerStyle: {
      backgroundColor: theme.primary,
      borderBottomColor: theme.primary,
      borderTopColor: theme.primary,
      height: '100%',
      paddingLeft: 10,
    },
    inputContainerStyle: {
      backgroundColor: theme.primary,
    },
  };
  const style = active ? activeStyle : inActiveStyle;

  const SearchIcon = () => {
    if (active) {
      return <BackArrow onPress={() => dispatch(toggleSearch())} />;
    }
    return (
      <Icon
        Component={TouchableWithoutFeedback}
        onPress={() => dispatch(toggleSearch())}
        color={theme.white}
        type="material"
        name="search"
      />
    );
  };
  return (
    <SearchBar
      platform="android"
      {...style}
      ref={ref}
      inputStyle={{
        color: theme.black,
      }}
      searchIcon={<SearchIcon />}
      value={keyword}
      onChangeText={value => dispatch(onSearch(value))}
      placeholder="Search"
    />
  );
};

export default Search;
