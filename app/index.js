import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Routes from './routes';
import rootReducer from './reducers';

import './app.global.css';

const enhancer = applyMiddleware(thunk);
function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(<App store={store} />, document.getElementById('root'));
