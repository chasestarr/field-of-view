// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import gists from './gists';

const rootReducer = combineReducers({
  auth,
  gists,
  router,
});

export default rootReducer;
