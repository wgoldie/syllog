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
  backgroundColor: theme.neutralBackground,
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
flex-direction: row;
`;

const AppHeader = styled.h1`
position: fixed;
top: 0;
left: 0;
width: 300px;
height: 100px;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;
font-size: 300%;
flex: 1;
background: ${props => props.theme.background};
color: ${props => props.theme.color};
&:hover {
  background: ${props => props.theme.hoverBackground};
  color: ${props => props.theme.hoverColor};
  border-color: ${props => props.theme.hoverBorder};
}
border-color: ${props => props.theme.border};
border-right: 1px solid;
border-bottom: 1px solid; 
padding: 30px;
z-index: 500;
`;

const FactorWrapper = styled.div`
min-width: 250px;
flex: 1;
position: relative;
overflow: hidden;
height: 100%;
`;

const MainColumn = styled.div`
flex: 5 1;
display: flex;
flex-direction: column;
`;

const cytoscapeLibrary = configureCytoscapeLibrary();
const cytoscapeStyle = getStyle(theme);

const App = () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <AppHeader>Syllog</AppHeader>
      <CytoscapeProvider>
        <MainColumn>
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
        </MainColumn>
        <FactorWrapper>
          <FactorLibrary />
        </FactorWrapper>
      </CytoscapeProvider>
    </AppWrapper>
  </ThemeProvider>
);

export default App;
