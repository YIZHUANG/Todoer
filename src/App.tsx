import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';

import ModalDisplay from 'components/Modals/ModalDisplay';
import Fab from 'components/Fab';
import theme from 'styles/theme';
import store from './store';
import Root from './Root';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalDisplay />
        <Root />
        <Fab />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
