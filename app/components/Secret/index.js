import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@gigster/pil';

import { $currentPath } from '../../state/vault';
import { readSecret } from '../../utils/api';

import styles from './styles.css';

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
        {Object.keys(this.state.data).map((key, idx) => (
          <div key={key} className="secret-entry">
            <Text tint={1}>
              <span className="secret-select">{key}</span>
              {' : '}
            </Text>
            <Text tint={1}>
              <span className="secret-select">{this.state.data[key]}</span>
            </Text>
            {Object.keys(this.state.data).length - 1 !== idx && <div className="secret-divider" />}
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
