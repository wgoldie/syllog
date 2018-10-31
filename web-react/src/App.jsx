import React from 'react';
import styled from 'styled-components';

const CytoscapeElement = styled.div`
width: 100%;
height: 90%;
position: absolute;
background-color: #000;
top: 0px;
left: 0px;
z-index: -100;
`;

const App = () => (
  <CytoscapeElement>
    <div id="cy" />
  </CytoscapeElement>
);

export default App;
