import React from 'react';
import CytoscapeView from './components/CytoscapeView';
import CytoscapeManager from './components/CytoscapeManager';

const App = () => (
  <div>
    <h1>Syllog</h1>
    <CytoscapeManager>
      <CytoscapeView />
    </CytoscapeManager>
  </div>
);

export default App;
