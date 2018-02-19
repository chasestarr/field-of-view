import React from 'react';

import styles from './style.css';

function Content(props) {
  return <div className="content">{props.children}</div>;
}

export default Content;
