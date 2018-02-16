/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Login from './containers/Login';

import { PrivateRoute } from 'utils/auth';

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <App>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={HomePage} />
    </App>
  </Router>
);
