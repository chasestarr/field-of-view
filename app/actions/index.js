import { keyBy } from 'lodash';

import Constants from '../utils/constants';
import { apiRequest, apiRequestAuth } from '../utils/api-requests';
import { Token } from '../utils/localstorage';

export function makeAsyncActionSet(actionName) {
  return {
    REQUEST: actionName + '_REQUEST',
    SUCCESS: actionName + '_SUCCESS',
    FAILURE: actionName + '_FAILURE',
  };
}

// auth

export const LOGIN = makeAsyncActionSet('LOGIN');
export function loginUser(authOptions, code) {
  const { hostname } = authOptions;
  const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname;

  return dispatch => {
    const url = `https://${hostname}/login/oauth/access_token`;
    const method = 'POST';
    const data = {
      client_id: authOptions.clientId,
      client_secret: authOptions.clientSecret,
      code: code,
    };

    dispatch({ type: LOGIN.REQUEST });

    return apiRequest(url, method, data)
      .then(function(response) {
        Token.upsert(response.data.access_token);
        dispatch({
          type: LOGIN.SUCCESS,
          payload: response.data,
          isEnterprise,
          hostname,
        });
      })
      .catch(function(error) {
        dispatch({ type: LOGIN.FAILURE, payload: error.response.data });
      });
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return { type: LOGOUT };
}

// gists

export const REQUEST_GISTS = makeAsyncActionSet('REQUEST_GISTS');
export function requestGists() {
  return (dispatch, getState) => {
    const { auth } = getState();
    const isLoggedIn = auth.token != null;

    if (auth.token == null) {
      return;
    }

    dispatch({ type: REQUEST_GISTS.REQUEST });

    const url = 'https://api.github.com/gists';
    const method = 'GET';
    return apiRequestAuth(url, method, auth.token).then(res => {
      const gists = keyBy(res.data, 'id');
      dispatch({ type: REQUEST_GISTS.SUCCESS, payload: gists });
    });
  };
}
