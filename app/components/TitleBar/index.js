import React from 'react';
import { Text } from '@gigster/pil';

import { VaultAddress } from '../../utils/localstorage/index';

import styles from './style.css';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Text size="label">{VaultAddress.read()}</Text>
      </div>
    );
  }
}
