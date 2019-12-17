
import useSelector from 'hooks/useSelector';

function useTheme() {
  const theme = useSelector(state => state.theme);
  return theme;
}

export default useTheme;
