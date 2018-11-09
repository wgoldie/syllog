import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderWrapper,
  UploadLabel,
  UploadInput,
  DownloadButtonInner,
  HeaderText,
  HeaderImage,
  HeaderButtons,
} from './styles';
import DownloadButton from '../DownloadButton';

const HeaderPresentation = ({ getCyJSON, loaderRef }) => (
  <HeaderWrapper>
    <HeaderText>
      <HeaderImage src="/favicon-96x96.png"/>
      Syllog
    </HeaderText>
    <HeaderButtons>
      <DownloadButton
        getDownload={getCyJSON}
        buttonRender={(onClick, children) => (
          <DownloadButtonInner
            role="button"
            onClick={onClick}
          >
            {children}
          </DownloadButtonInner>)
        }
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
    </HeaderButtons>
  </HeaderWrapper>
);

HeaderPresentation.propTypes = {
  getCyJSON: PropTypes.func.isRequired,
  loaderRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default HeaderPresentation;
