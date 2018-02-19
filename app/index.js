import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Routes from './routes';
import reducer from './state/reducer';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const enhancer = applyMiddleware(thunk, logger);
function configureStore(initialState?: any) {
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(<App store={store} />, document.getElementById('root'));
