import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CytoscapeElement = styled.div`
width: 100%;
height: 90%;
min-height: 900px;
position: absolute;
background-color: #000;
top: 0px;
left: 0px;
z-index: -100;
`;

const CytoscapePresentation = ({ cyRef }) => (
  <CytoscapeElement id="cy" ref={cyRef} />
);

CytoscapePresentation.propTypes = {
  cyRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default CytoscapePresentation;
