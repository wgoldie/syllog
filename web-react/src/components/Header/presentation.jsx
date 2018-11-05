import React from 'react';
import { CytoscapePropTypes } from 'react-cytoscape-tools';
import { HeaderWrapper, HeaderButton } from './styles';
import DownloadButton from '../DownloadButton';

const HeaderPresentation = ({ getCyJSON }) => (
  <HeaderWrapper>
    Syllog
    <DownloadButton getDownload={getCyJSON}>
      Download model
    </DownloadButton>
  </HeaderWrapper>
);

HeaderPresentation.propTypes = {
  getCyJSON: CytoscapePropTypes.cyJSON.isRequired,
};

export default HeaderPresentation;
