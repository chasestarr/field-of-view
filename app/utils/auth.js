// @flow

import React from 'react';
import { Route, Redirect } from 'react-router';

import { getToken } from './localstorage';

export function isLoggedIn() {
  return !!getToken();
}

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  console.log(isLoggedIn());
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
