import React, { Component } from 'react';
import { Text } from '@gigster/pil';

import Content from '../components/Content/index';

import { VaultAddress } from '../utils/localstorage/index';

import styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <Text size="label">{VaultAddress.read()}</Text>
        </div>
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}
