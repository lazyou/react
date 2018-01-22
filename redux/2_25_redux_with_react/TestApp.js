import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ContainApp from './containers/ContainApp';
import todoApp from './reducers/TestReducers';

let store = createStore(todoApp);

let rootElement = document.getElementById('TestApp');

render(
  <Provider store={store}>
    <ContainApp />
  </Provider>,
  rootElement
);
