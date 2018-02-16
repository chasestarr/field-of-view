import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/pastel_on_dark';

import { getToken } from '../utils/localstorage';
import { apiRequestAuth } from '../utils/api-requests';

import styles from './File.css';

class File extends React.Component {
  state = { raw: '' };

  componentDidMount() {
    // raw_url
    // filename
    // type
    // language
    // size

    // will need to normalize files... so that it can be properly read/written
    // normalizr when fetching for gists
    // file name is unique with respect to gist id

    const token = getToken();
    apiRequestAuth(this.props.data.raw_url, 'GET', token).then(res => {
      this.setState({ raw: res.data });
    });
  }

  onChange = newCode =>
    this.setState({
      code: newCode,
    });

  render() {
    if (!this.state.raw) {
      return <div>Loading File</div>;
    }

    return (
      <div>
        <AceEditor
          className={styles.editField}
          value={this.state.raw}
          mode="javascript"
          theme="pastel_on_dark"
          onChange={this.onChange}
          name={this.props.raw_url}
          fontSize={12}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}

export default File;
