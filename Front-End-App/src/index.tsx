import { createGenerateClassName, StylesProvider } from '@material-ui/core';
import { store } from 'common/sitka';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import XGridDemo from 'ui/modules/user/atoms/DataGridAtom';
import Cool from 'ui/modules/user/screens/Cool';
import reportWebVitals from './reportWebVitals';
import UserScreen from './ui/modules/user/screens/User';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  seed: 'm-c',
})

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider generateClassName={generateClassName}>
          <UserScreen />
    </StylesProvider>
  </Provider>,
  
  document.getElementById("root")
)
