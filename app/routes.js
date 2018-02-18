/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Login from './containers/Login';

import { PrivateRoute } from 'utils/auth';

const history = createHashHistory();

export default () => (
  <Router history={history}>
    <div>
      {window.location.pathname.includes('app.html') && <Redirect to="/" />}
      <App>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
        </Switch>
      </App>
    </div>
  </Router>
);
