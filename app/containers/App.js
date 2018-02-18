import React, { Component } from 'react';

import Content from '../components/Content/index';
import TitleBar from '../components/TitleBar/index';

export default class App extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}
