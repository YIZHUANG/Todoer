export const OPEN_SEARCH = 'OPEN_SEARCH';
export const CLOSE_SEARCH = 'CLOSE_SEARCH';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const ON_SEARCH = 'ON_SEARCH';

export const openSearch = () => {
  return {
    type: OPEN_SEARCH,
  };
};
export const closeSearch = () => {
  return {
    type: CLOSE_SEARCH,
  };
};
export const toggleSearch = () => {
  return {
    type: TOGGLE_SEARCH,
  };
};
export const onSearch = (keyword: string) => {
  return {
    type: ON_SEARCH,
    keyword,
  };
};
