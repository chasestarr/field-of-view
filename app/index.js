import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store/configureStore';

import Routes from './routes';
import './app.global.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(<App store={store} />, document.getElementById('root'));
