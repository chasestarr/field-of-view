// @flow

import { combineReducers } from 'redux';

import vault from './vault';

const rootReducer = combineReducers({
  vault,
});

export default rootReducer;
