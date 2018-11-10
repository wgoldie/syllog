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
  ExamplePicker,
  ExampleList,
} from './styles';
import DownloadButton from '../DownloadButton';
import icon from '../../static/icon.png';

const HeaderPresentation = ({
  getCyJSON,
  loaderRef,
  examples,
  handleExampleChange,
}) => (
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
      <ExamplePicker>
        Load example:
        <ExampleList onChange={handleExampleChange}>
          {
            [<option key="" value="">---Examples---</option>].concat(
              examples.map(example => (
                <option key={example} value={example}>
                  {example}
                </option>
              )),
            )
          }
        </ExampleList>
      </ExamplePicker>
    </HeaderButtons>
  </HeaderWrapper>
);

HeaderPresentation.propTypes = {
  getCyJSON: PropTypes.func.isRequired,
  handleExampleChange: PropTypes.func.isRequired,
  loaderRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HeaderPresentation;
