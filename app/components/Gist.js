import React from 'react';

import File from './File';

function Gist(props) {
  return (
    <div>
      <div>{props.data.id}</div>
      <div>{props.data.description}</div>
      {Object.values(props.data.files).map(file => (
        <File key={`${props.data.id}-${file.filename}`} data={file} />
      ))}
    </div>
  );
}

export default Gist;
