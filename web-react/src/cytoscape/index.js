import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';
import getStyle from './style';
// import { EDITOR_MODES } from '../constants/cytoscape';
// import contextMenuReducer from './contextMenus';

cytoscape.use(cxtmenu);
cytoscape.use(dagre);
cytoscape.use(edgehandles);

const attachCytoscape = (element) => {
  const cy = cytoscape({
    container: element,
    layout: {
      name: 'dagre',
    },
    elements: {
      nodes: [{ data: { id: 'a' } }, { data: { id: 'b' } }],
      edges: [{ data: { source: 'a', target: 'b' } }],
    },
  });

  // Default to directed graph
  cy.json({
    style: getStyle(),
  });

  return cy;
};

export default attachCytoscape;
