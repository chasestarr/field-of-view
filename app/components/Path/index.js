import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from '@gigster/pil';

import { $currentPath, appendCurrentPath } from '../../state/vault';
import { listSecrets } from '../../utils/api';

import styles from './styles.css';

class Path extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keys: [] };
  }

  componentDidMount() {
    this.readKeys();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.readKeys();
    }
  }

  readKeys() {
    listSecrets(this.props.path.join('')).then(keys => this.setState({ keys }));
  }

  handleClick(item) {
    this.props.appendCurrentPath(item);
  }

  render() {
    return (
      <div>
        {this.state.keys.map(key => {
          const isSecret = key.charAt(key.length - 1) !== '/';
          return (
            <div key={key} className="path-row">
              <Button onClick={this.handleClick.bind(this, key)} status="transparent">
                <span className="path-icon">
                  <Icon
                    name={isSecret ? 'InfoOutline' : 'FolderOpen'}
                    status="outline"
                    size="subheading"
                  />
                </span>
                {key}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  path: $currentPath(state),
});

export default connect(mapStateToProps, { appendCurrentPath })(Path);
