import React from 'react';
import { CytoscapeView, CytoscapeGate, CytoscapeProvider } from 'react-cytoscape-tools';
import { ThemeProvider } from 'styled-components';

import EditModeMenus from '../EditModeMenus';
import Header from '../Header';
import FactorLibrary from '../FactorLibrary';
import getStyle from '../../cytoscape/style';
import configureCytoscapeLibrary from '../../cytoscape';
import theme from '../../style/defaultTheme';
import {
  CyWrapper,
  AppWrapper,
  MainColumn,
} from './style';


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

const cytoscapeLibrary = configureCytoscapeLibrary();
const cytoscapeStyle = getStyle(theme);

const App = () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <CytoscapeProvider>
        <CytoscapeGate>
          <Header />
        </CytoscapeGate>
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
          <FactorLibrary />
        </MainColumn>
      </CytoscapeProvider>
    </AppWrapper>
  </ThemeProvider>
);

export default App;
