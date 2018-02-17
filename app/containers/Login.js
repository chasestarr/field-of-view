const { ipcRenderer } = require('electron');

import React from 'react';
import { Redirect } from 'react-router-dom';
import { TextInput, Text, Button } from '@gigster/pil';

import { login } from 'utils/vault-api';

import styles from './LoginStyles.css';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vaultAddress: '',
      githubToken: '',
      error: '',
      redirectToReferrer: false,
    };
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value, error: '' });
  }

  handleSubmit(event) {
    event.preventDefault();

    const vaultAddress = this.state.vaultAddress;

    login(vaultAddress, this.state.githubToken)
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(() => this.setState({ error: '401: Bad Credentials' }));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form className={styles.loginContainer}>
        <div className={styles.field}>
          <Text size="label" status="primary" tint={2}>
            Vault Address
          </Text>
          <TextInput
            value={this.state.vaultAddress}
            onChange={e => this.handleChange(e, 'vaultAddress')}
          />
        </div>
        <div className={styles.field}>
          <Text size="label" status="primary" tint={2}>
            Github Token
          </Text>
          <TextInput
            value={this.state.githubToken}
            onChange={e => this.handleChange(e, 'githubToken')}
          />
        </div>
        <div className={styles.field}>
          <Button
            type="submit"
            disabled={!this.state.vaultAddress || !this.state.githubToken}
            onClick={this.handleSubmit.bind(this)}
          >
            Login
          </Button>
        </div>
        {this.state.error && (
          <Text size="label" status="danger">
            {this.state.error}
          </Text>
        )}
      </form>
    );
  }
}

export default LoginPage;
