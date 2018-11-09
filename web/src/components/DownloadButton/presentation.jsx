/* eslint "jsx-a11y/anchor-has-content": 0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DownloadButtonPresentation = ({
  children,
  triggerDownload,
  href,
  dlRef,
  buttonRender,
}) => (
  buttonRender(triggerDownload, (
    <Fragment>
      <a
        href={href}
        ref={dlRef}
        download="model.json"
        target="_blank"
        rel="noopener noreferrer"
      />
      {children}
    </Fragment>)));

DownloadButtonPresentation.propTypes = {
  children: PropTypes.node.isRequired,
  triggerDownload: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  dlRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  buttonRender: PropTypes.func.isRequired,
};

export default DownloadButtonPresentation;
