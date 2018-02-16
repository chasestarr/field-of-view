// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import TitleBar from '../components/TitleBar';
import Content from '../components/Content';

export default class App extends Component {
  props: {
    children: Children,
  };

  render() {
    return (
      <div>
        <TitleBar />
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}
