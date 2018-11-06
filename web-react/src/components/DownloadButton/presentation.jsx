import React from 'react';
import PropTypes from 'prop-types';

const DownloadButtonPresentation = ({
  children,
  triggerDownload,
  href,
  dlRef,
}) => (
  <button
    type="button"
    onClick={triggerDownload}
  >
    <a href={href} ref={dlRef} download="model.json" />
    {children}
  </button>
);

DownloadButtonPresentation.propTypes = {
  children: PropTypes.node.isRequired,
  triggerDownload: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  dlRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default DownloadButtonPresentation;
