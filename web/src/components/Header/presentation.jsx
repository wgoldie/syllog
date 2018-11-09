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
import icon from '../../icon.png';

const HeaderPresentation = ({ getCyJSON, loaderRef }) => (
  <HeaderWrapper>
    <HeaderText>
      <HeaderImage src={icon} />
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
        Export Model
      </DownloadButton>
      <UploadLabel htmlFor="model">
        Import Model
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
