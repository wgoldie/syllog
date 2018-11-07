import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderWrapper,
  UploadLabel,
  UploadInput,
  DownloadButtonInner,
} from './styles';
import DownloadButton from '../DownloadButton';


const HeaderPresentation = ({ getCyJSON, loaderRef }) => (
  <HeaderWrapper>
    Syllog
    <DownloadButton
      getDownload={getCyJSON}
      ButtonRender={DownloadButtonInner}
    >
      Download Model
    </DownloadButton>
    <UploadLabel htmlFor="model">
      Upload Model
      <UploadInput
        type="file"
        id="model"
        ref={loaderRef}
      />
    </UploadLabel>
  </HeaderWrapper>
);

HeaderPresentation.propTypes = {
  getCyJSON: PropTypes.func.isRequired,
  loaderRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default HeaderPresentation;
