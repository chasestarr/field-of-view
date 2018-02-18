import React from 'react';

import Breadcrumbs from '../Breadcrumbs/index';
import Logout from '../Logout/index';

import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <Breadcrumbs />
        <Logout />
      </div>
    );
  }
}

export default Header;
