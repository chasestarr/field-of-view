// @flow

import React from 'react';
import Home from '../components/Home';
import { Text } from '@gigster/pil';

import { listSecrets, readSecret } from '../utils/vault-api';

import styles from './HomePage.css';

class Entry extends React.Component {
  render() {
    return (
      <div className={styles.path}>
        <Text tint={1}>{this.props.label}: </Text>
        <Text tint={1}>{this.props.value}</Text>
      </div>
    );
  }
}

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div>
        <div className={styles.path}>
          <a className={styles.link} onClick={this.handleClick.bind(this)}>
            <Text status="success" tint={2}>
              {this.props.path}
            </Text>
          </a>
        </div>
        {this.state.open && (
          <div>
            {Object.keys(this.props.data).map(key => (
              <Entry key={key} label={key} value={this.props.data[key]} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

class Path extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = { data: {}, keys: [], open: false };
  }

  componentDidMount() {
    const { path = '' } = this.props;
    readSecret(path).then(data => this.setState({ data }));
    listSecrets(path).then(keys => this.setState({ keys }));
  }

  isSecret() {
    return !!Object.keys(this.state.data).length;
  }

  handleClick() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { path = '', defaultOpen = false } = this.props;

    if (defaultOpen) {
      return <div>{this.state.keys.map(key => <Path key={key} path={path + key} />)}</div>;
    }

    if (this.isSecret()) {
      return <Secret path={path} data={this.state.data} />;
    }

    return (
      <div className={styles.path}>
        <a className={styles.link} onClick={this.handleClick.bind(this)}>
          <Text status="primary" tint={2}>
            {path}
          </Text>
        </a>
        {this.state.open && this.state.keys.map(key => <HomePage path={path + key} />)}
      </div>
    );
  }
}

class HomePage extends React.Component {
  render() {
    const { path = '' } = this.props;
    return <Path path={path} defaultOpen />;
  }
}

export default HomePage;
