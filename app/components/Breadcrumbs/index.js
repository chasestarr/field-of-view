import React from 'react';
import { connect } from 'react-redux';
import { Button, Text } from '@gigster/pil';

import { $currentPath, writeCurrentPath } from '../../state/vault';

import styles from './styles.css';

class Breadcrumbs extends React.Component {
  handleClick(idx) {
    const nextPath = this.props.path.slice(0, idx + 1);
    this.props.writeCurrentPath(nextPath);
  }

  render() {
    const { path } = this.props;
    return (
      <div className="breadcrumbs">
        {path.map((item, idx) => {
          const isLast = idx === path.length - 1;
          return (
            <div key={item} className="breadcrumbs-item">
              <Button
                status={isLast ? 'outline' : 'transparent'}
                onClick={this.handleClick.bind(this, idx)}
              >
                {item}
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

export default connect(mapStateToProps, { writeCurrentPath })(Breadcrumbs);
