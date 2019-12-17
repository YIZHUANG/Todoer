import React from 'react';
import {TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import useSelector from 'hooks/useSelector';
import {toggleSearch, onSearch} from 'actions/search';
import useTheme from 'hooks/useTheme';
import BackArrow from 'components/Icons/BackArrow';
import {HEADER_HEIGHT} from 'src/constants';
import useTranslate from 'hooks/useTranslate';

const Search = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const ref = React.useRef(null);
  const keyword = useSelector(state => state.search.keyword);
  const active = useSelector(state => state.search.active);
  const t = useTranslate();
  React.useEffect(() => {
    if (!active) {
      ref.current.cancel();
      ref.current.blur();
    }
  }, [active]);

  const getSearchStyle = (active: boolean) => {
    const color = active ? theme.white : theme.red;
    return {
      containerStyle: {
        backgroundColor: color,
        borderBottomColor: color,
        borderTopColor: color,
        height: HEADER_HEIGHT,
        paddingLeft: active ? 10 : 0,
      },
      inputContainerStyle: {
        backgroundColor: color,
      },
    };
  };
  const inActiveStyle = getSearchStyle(false);
  const activeStyle = getSearchStyle(true);
  const style = active ? activeStyle : inActiveStyle;

  function onToggleSearch() {
    dispatch(toggleSearch());
  }
  const SearchIcon = () => {
    if (active) {
      return <BackArrow onPress={onToggleSearch} />;
    }
    return (
      <Icon
        Component={TouchableWithoutFeedback}
        onPress={onToggleSearch}
        color={theme.white}
        type="material"
        name="search"
      />
    );
  };
  return (
    <KeyboardAvoidingView>
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
        placeholder={t('SEARCH')}
      />
    </KeyboardAvoidingView>
  );
};

export default Search;
