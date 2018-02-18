import axios from 'axios';

import { Token, Username, VaultAddress } from './localstorage/index';

function unauthenticatedRequest(method, url, data = {}) {
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cache-Control'] = 'no-cache';
  return axios({ method, url, data });
}

function authenticatedRequest(token, method, url, data = {}) {
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cache-Control'] = 'no-cache';
  axios.defaults.headers.common['X-Vault-Token'] = token;
  return axios({ method, url, data });
}

export function login(url, token) {
  const authUrl = `${url}/v1/auth/github/login`;
  const data = { token };
  return unauthenticatedRequest('POST', authUrl, data).then(response => {
    Token.upsert(response.data.auth.client_token);
    Username.upsert(response.data.auth.metadata.username);
    VaultAddress.upsert(url);
  });
}

export function sealStatus() {
  return unauthenticatedRequest('GET', `${VaultAddress.read()}/v1/sys/seal-status`).then(
    res => res.data.sealed
  );
}

export function listSecrets(path) {
  const url = `${VaultAddress.read()}/v1/secret${path}?list=true`;
  return authenticatedRequest(Token.read(), 'GET', url).then(response => response.data.data.keys);
}

export function readSecret(path) {
  const url = `${VaultAddress.read()}/v1/secret${path}`;
  return authenticatedRequest(Token.read(), 'GET', url).then(response => response.data.data);
}
