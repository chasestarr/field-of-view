import axios from 'axios';

import { getToken, getVaultAddress } from './localstorage';

function unauthenticatedRequest(method, path, data = {}) {
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
  return unauthenticatedRequest('POST', authurl, data);
}

export function isSealed() {
  return unauthenticatedRequest('GET', '/sys/seal-status').then(res => res.sealed);
}
