import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';

const configureCytoscapeLibrary = () => {
  cytoscape.use(cxtmenu);
  cytoscape.use(dagre);
  cytoscape.use(edgehandles);
  return cytoscape;
};

export default configureCytoscapeLibrary;
