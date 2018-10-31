import React from 'react';
import uuidv4 from 'uuid/v4';
import CytoscapeView from './components/CytoscapeView';
import CytoscapeManager from './components/CytoscapeManager';
import CytoscapeGate from './components/CytoscapeGate';
import ContextMenu from './components/ContextMenu';
import { NODE_TYPES, VARIABLE_TYPES } from './constants/cytoscape';

export const variableCyJSON = (name, variableType) => ({
  data: {
    id: uuidv4(),
    name,
    type: NODE_TYPES.VARIABLE,
    variableType,
  },
});


export const addVariable = variableType => (cy, getVariableName) => ({
  content: `${variableType} Node`,
  select(ele, ev) {
    cy.add({
      ...variableCyJSON(getVariableName(), variableType),
      position: ev.position,
    });
  },
});


const App = () => (
  <div>
    <h1>Syllog</h1>
    <CytoscapeManager>
      <CytoscapeView />
      <CytoscapeGate>
        <ContextMenu commandBuilders={[addVariable(VARIABLE_TYPES.LATENT)]} selector="core" />
      </CytoscapeGate>
    </CytoscapeManager>
  </div>
);

export default App;
