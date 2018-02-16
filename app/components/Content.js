import React from 'react';

import styles from './Content.css';

function Content(props) {
  return <div className={styles.content}>{props.children}</div>;
}

export default Content;
