import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@gigster/pil';

import { $currentPath } from '../../state/vault';
import { readSecret } from '../../utils/vault-api';

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.readData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.readData();
    }
  }

  readData() {
    readSecret(this.props.path.join('')).then(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.data).map(key => (
          <div key={key}>
            <Text>
              {key}:{this.state.data[key]}
            </Text>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  path: $currentPath(state),
});

export default connect(mapStateToProps)(Secret);
