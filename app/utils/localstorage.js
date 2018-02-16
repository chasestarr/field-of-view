// @flow

const TOKEN = 'token';
const VAULT_ADDR = 'vault_addr';

export function setToken(token: string) {
  return window.localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return window.localStorage.getItem(TOKEN);
}

export function setVaultAddress(address: string) {
  return window.localStorage.setItem(VAULT_ADDR, address);
}

export function getVaultAddress() {
  return window.localStorage.getItem(VAULT_ADDR);
}
