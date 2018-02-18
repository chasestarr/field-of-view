import React from 'react';
import { withRouter } from 'react-router';
import { TextInput, Text, Button } from '@gigster/pil';

import { login } from '../utils/api';

import styles from './LoginStyles.css';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vaultAddress: '',
      githubToken: '',
      error: '',
    };
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value, error: '' });
  }

  handleSubmit(event) {
    event.preventDefault();

    const vaultAddress = this.state.vaultAddress;

    login(vaultAddress, this.state.githubToken)
      .then(() => this.props.history.push('/'))
      .catch(() => this.setState({ error: '401: Bad Credentials' }));
  }

  render() {
    return (
      <div className={styles.page}>
        <form className={styles.loginContainer}>
          <div className={styles.field}>
            <Text size="label" tint={2}>
              Vault Address
            </Text>
            <TextInput
              value={this.state.vaultAddress}
              onChange={e => this.handleChange(e, 'vaultAddress')}
            />
          </div>
          <div className={styles.field}>
            <Text size="label" tint={2}>
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
      </div>
    );
  }
}

export default withRouter(LoginPage);
