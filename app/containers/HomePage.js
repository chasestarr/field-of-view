import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/index';
import Path from '../components/Path/index';
import Secret from '../components/Secret/index';
import { $currentPath, $isCurrentPathSecret } from '../state/vault';

import styles from './HomePage.css';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-wrapper">{this.props.isCurrentPathSecret ? <Secret /> : <Path />}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  path: $currentPath(state),
  isCurrentPathSecret: $isCurrentPathSecret(state),
});

export default connect(mapStateToProps)(HomePage);
