import {useContext} from 'react';
import {ThemeContext} from 'react-native-elements';

function useTheme() {
  const {theme} = useContext(ThemeContext);
  return theme;
}

export default useTheme;
