import React from 'react';
import uuidv4 from 'uuid/v4';
import CytoscapeView from './components/CytoscapeView';
import CytoscapeManager from './components/CytoscapeManager';
import CytoscapeGate from './components/CytoscapeGate';
import EditModeMenus from './components/EditModeMenus';
import { NODE_TYPES, VARIABLE_TYPES } from './constants/cytoscape';

const App = () => (
  <div>
    <h1>Syllog</h1>
    <CytoscapeManager>
      <CytoscapeView />
      <CytoscapeGate>
        <EditModeMenus />
      </CytoscapeGate>
    </CytoscapeManager>
  </div>
);

export default App;
