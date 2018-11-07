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
    console.log(JSON.stringify(downloadJSON, null, 2));
    this.setState({ href: jsonToBlob(downloadJSON) });
  }

  componentDidUpdate = () => {
    if (this.state.href) {
      this.dlRef.current.click();
      this.setState({ href: '' });
    }
  }

  render() {
    const { triggerDownload, dlRef } = this;
    const { href } = this.state;
    const { children, ButtonRender } = this.props;
    return React.createElement(
      Presentation,
      {
        triggerDownload,
        href,
        dlRef,
        ButtonRender,
      },
      children,
    );
  }
}

DownloadButtonContainer.propTypes = {
  getDownload: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ButtonRender: PropTypes.func.isRequired,
};

export default DownloadButtonContainer;
