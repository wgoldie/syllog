import React from 'react';
import PropTypes from 'prop-types';
import { jsonToBlob } from '../../utils/url';
import Presentation from './presentation';

class DownloadButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.dlRef = React.createRef();
    this.state = { href: '' };
  }

  triggerDownload = () => {
    const downloadJSON = this.props.getDownload();
    this.setState({ href: jsonToBlob(downloadJSON) });
    debugger;
    this.dlRef.current.click();
  }

  render() {
    const { triggerDownload, dlRef } = this;
    const { href } = this.state;
    const { children } = this.props;
    return React.createElement(Presentation, {
      triggerDownload,
      href,
      dlRef,
      children,
    });
  }
}

DownloadButtonContainer.propTypes = {
  getDownload: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DownloadButtonContainer;
