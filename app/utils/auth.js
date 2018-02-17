// @flow

import React from 'react';
import { Route, Redirect } from 'react-router';

import { Token } from './localstorage/index';

export function isLoggedIn() {
  return !!Token.read();
}

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
