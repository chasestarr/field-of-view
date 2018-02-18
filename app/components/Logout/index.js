import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@gigster/pil';

import { Token, Username, VaultAddress } from '../../utils/localstorage/index';

class Logout extends React.Component {
  handleClick() {
    Token.remove();
    VaultAddress.remove();
    Username.remove();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Button status="outline" onClick={this.handleClick.bind(this)}>
          Logout
        </Button>
      </div>
    );
  }
}

export default withRouter(Logout);
