import React from 'react';
import { CytoscapeView, CytoscapeGate, CytoscapeProvider } from 'react-cytoscape-tools';
import styled, { ThemeProvider } from 'styled-components';
import EditModeMenus from './EditModeMenus';
import FactorLibrary from './FactorLibrary';
import getStyle from '../cytoscape/style';
import configureCytoscapeLibrary from '../cytoscape';
import theme from '../style/defaultTheme';

// @TODO: Make this into a styled-component,
// need to allow a render prop in react-cytoscape-tools
const cyElementStyle = {
  width: '100%',
  position: 'absolute',
  backgroundColor: '#000',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
};

const CyWrapper = styled.div`
flex: 9
position: relative;
overflow: hidden;
width: 100%;
`;

const AppWrapper = styled.div`
height: 100%;
overflow: hidden;
display: flex;
flex-direction: column;
`;

const AppHeader = styled.h1`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;
font-size: 300%;
flex: 1;
background: ${props => props.theme.background};
color: ${props => props.theme.color};
border-bottom: 1px solid ${props => props.theme.border};
padding: 30px;
`;

const FactorWrapper = styled.div`
flex: 5;
position: relative;
overflow: hidden;
width: 100%;
`;

const cytoscapeLibrary = configureCytoscapeLibrary();
const cytoscapeStyle = getStyle();

const App = () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <CytoscapeProvider>
        <AppHeader>Syllog</AppHeader>
        <CyWrapper>
          <CytoscapeView
            style={cyElementStyle}
            cyInitJSON={{ style: cytoscapeStyle }}
            cytoscape={cytoscapeLibrary}
          />
          <CytoscapeGate>
            <EditModeMenus />
          </CytoscapeGate>
        </CyWrapper>
        <FactorWrapper>
          <FactorLibrary />
        </FactorWrapper>
      </CytoscapeProvider>
    </AppWrapper>
  </ThemeProvider>
);

export default App;
