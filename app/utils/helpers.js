import { parse } from 'url';
const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;

import Constants from './constants';
import { loginUser } from '../actions';

export function getEnterpriseAccountToken(hostname, accounts) {
  return accounts.find(obj => obj.get('hostname') === hostname).get('token');
}

export function authGithub(authOptions = Constants.DEFAULT_AUTH_OPTIONS, dispatch) {
  // Build the OAuth consent page URL
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const githubUrl = `https://${authOptions.hostname}/login/oauth/authorize?`;
  const authUrl =
    githubUrl + 'client_id=' + authOptions.clientId + '&scope=' + Constants.AUTH_SCOPE;

  authWindow.loadURL(authUrl);

  function handleCallback(url) {
    const raw_code = /code=([^&]*)/.exec(url) || null;
    const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
    const error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy();
    }

    // If there is a code, proceed to get token from github
    if (code) {
      dispatch(loginUser(authOptions, code));
    } else if (error) {
      alert(
        "Oops! Something went wrong and we couldn't " + 'log you in using Github. Please try again.'
      );
    }
  }

  // If "Done" button is pressed, hide "Loading"
  authWindow.on('close', function() {
    authWindow.destroy();
  });

  authWindow.webContents.on('did-fail-load', function(
    event,
    errorCode,
    errorDescription,
    validatedURL
  ) {
    if (validatedURL.includes(authOptions.hostname)) {
      authWindow.destroy();

      dialog.showErrorBox('Invalid Hostname', `Could not load https://${authOptions.hostname}/.`);
    }
  });

  authWindow.webContents.on('will-navigate', function(event, url) {
    handleCallback(url);
  });

  authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
    handleCallback(newUrl);
  });
}

export function isUserEitherLoggedIn(auth) {
  return auth.token !== null;
}
