/* eslint "jsx-a11y/anchor-has-content": 0 */
import React from 'react';
import PropTypes from 'prop-types';

const DownloadButtonPresentation = ({
  children,
  triggerDownload,
  href,
  dlRef,
  ButtonRender,
}) => (
  <ButtonRender
    type="button"
    onClick={triggerDownload}
  >
    <a
      href={href}
      ref={dlRef}
      download="model.json"
      target="_blank"
      rel="noopener noreferrer"
    />
    {children}
  </ButtonRender>
);

DownloadButtonPresentation.propTypes = {
  children: PropTypes.node.isRequired,
  triggerDownload: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  dlRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  ButtonRender: PropTypes.func.isRequired,
};

export default DownloadButtonPresentation;
