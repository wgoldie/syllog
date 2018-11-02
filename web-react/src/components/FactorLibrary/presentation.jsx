import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InternalPropTypes from '../../constants/InternalPropTypes';

const Wrapper = styled.ul`
display: flex;
justify-content: flex-start;
flex-direction-row;
align-items: center;
padding: 10px;
width: 100%;
height: 100%;
overflow-y: hidden;
overflow-x: scroll;
`;

const Factor = styled.li`
display: flex;
flex-direction: column;
justify-content: flex-start;
overflow-x: hidden;
overflow-y: scroll;
height: 100%;
width: 200px;
border: 1px solid #000;
border-radius: 5px;
padding: 10px;
margin: 10px;
`;

const FactorName = styled.span`
display: block;
background: #000;
color: #fff;
left: 5px;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
border: 1px solid #000;
padding: 5px;
`;

const FactorFieldsetWrapper = styled.div`
display: block;
border: 1px solid #000;
padding: 5px;
margin: 5px 0;
`;

const FactorFieldsetName = styled.span`
display: block;
text-decoration: underline;
margin: 5px;
`;

const FactorFieldsWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

const FactorField = styled.div`
margin: 5px;
display: inline-block;
border: 1px solid #000;
padding: 5px;
&:hover {
  background: #000;
  color: #fff;
}
`;

const AddButton = styled.button`
margin: 5px 0;
padding: 5px;
display: block;
background: none;
border-radius: 0;
&:hover {
  background: #999;
  cursor: pointer;
}
highlight: none;
border: 1px solid #000;
color: #000;
`;

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

const FactorLibraryPresentation = ({ factors, makeOnClick }) => (
  <Wrapper>
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
  </Wrapper>
);


FactorLibraryPresentation.defaultProps = {
  factors: {},
};

FactorLibraryPresentation.propTypes = {
  factors: InternalPropTypes.factors,
  makeOnClick: PropTypes.func.isRequired,
};

export default FactorLibraryPresentation;
