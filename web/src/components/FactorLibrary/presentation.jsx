import React from 'react';
import PropTypes from 'prop-types';
import InternalPropTypes from '../../constants/InternalPropTypes';
import {
  Wrapper,
  Header,
  HeaderText,
  FactorsWrapper,
  Factor,
  FactorName,
  FactorFieldsetWrapper,
  FactorFieldsetName,
  FactorFieldsWrapper,
  FactorField,
  AddButton,
  FactorsLink,
  FactorsButton,
  FactorsInput,
  FactorsInputLabel,
} from './styles';
import { jsonToBlob } from '../../utils/url';

const FactorFieldset = ({ title, fields }) => (
  <FactorFieldsetWrapper>
    <FactorFieldsetName>{title}</FactorFieldsetName>
    <FactorFieldsWrapper>
      {
        fields.map(field => (
          <FactorField key={field}>
            {field}
          </FactorField>))
      }
    </FactorFieldsWrapper>
  </FactorFieldsetWrapper>
);

FactorFieldset.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};


const FactorLibraryPresentation = ({
  loaderRef,
  factors,
  makeOnClick,
  clearFactors,
}) => (
  <Wrapper>
    <Header>
      <HeaderText>Factors</HeaderText>
      <FactorsInputLabel>
        Import Factors
        <FactorsInput
          type="file"
          id="factors"
          ref={loaderRef}
        />
      </FactorsInputLabel>
      <FactorsLink
        href={jsonToBlob(factors)}
        download="factors.json"
      >
        Export Factors
      </FactorsLink>
      <FactorsButton
        role="button"
        onClick={clearFactors}
      >
        Clear Factors
      </FactorsButton>
    </Header>
    <FactorsWrapper>
      {
        Object.entries(factors).map(([name, factor]) => (
          <Factor key={name}>
            <FactorName>{name}</FactorName>
            <FactorFieldset title="Inputs" fields={factor.inputs} />
            <FactorFieldset title="Outputs" fields={factor.outputs} />
            <AddButton
              role="button"
              onClick={makeOnClick(name)}
            >
              Add
            </AddButton>
          </Factor>
        ))
      }
    </FactorsWrapper>
  </Wrapper>
);


FactorLibraryPresentation.defaultProps = {
  factors: {},
};

FactorLibraryPresentation.propTypes = {
  loaderRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  factors: InternalPropTypes.factors,
  makeOnClick: PropTypes.func.isRequired,
  clearFactors: PropTypes.func.isRequired,
};

export default FactorLibraryPresentation;
