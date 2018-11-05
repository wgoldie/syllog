import React from 'react';

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

export default DownloadButtonPresentation;
