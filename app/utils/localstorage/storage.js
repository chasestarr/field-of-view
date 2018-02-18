// @flow

class Storage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  upsert(data: string) {
    window.localStorage.setItem(this.key, data);
  }

  read() {
    return window.localStorage.getItem(this.key);
  }

  remove() {
    window.localStorage.removeItem(this.key);
  }
}

export default Storage;
