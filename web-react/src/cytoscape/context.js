import React from 'react';

const CytoscapeContext = React.createContext({
  cy: null,
  setCy: () => {},
});

export default CytoscapeContext;
