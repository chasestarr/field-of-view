import axios from 'axios';

export function login(url, token) {
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cache-Control'] = 'no-cache';
  const authUrl = `${url}/v1/auth/github/login`;
  const data = { token };
  return axios({ method: 'POST', url: authUrl, data });
}
