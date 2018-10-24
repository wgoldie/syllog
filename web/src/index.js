import cytoscape from 'cytoscape';

// cytoscape plugin imports
import cxtmenu from 'cytoscape-cxtmenu';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';

import getStyle from './graphStyle';
import { EDITOR_MODES } from './constants';
import contextMenuReducer from './contextMenus';

// cytoscape plugin activation
cytoscape.use(cxtmenu);
cytoscape.use(dagre);
cytoscape.use(edgehandles);

// Init cytoscape graph library
const cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'dagre',
  },
});

// Default to directed graph
cy.json({
  style: getStyle(),
});

let variableNameIndex = 0;
const variableNames = 'abcdefghijklmnopqrstuvwxyz';
const loop = variableNames.length;

function getVariableName() {
  let name = null;
  while (!name || cy.nodes().filter(`node[name="${name}"]`).length > 0) {
    name = `${variableNames[variableNameIndex % loop]}${
      variableNameIndex > loop ? Math.floor(variableNameIndex / loop) : ''
    }`;
    variableNameIndex += 1;
  }

  return name;
}

contextMenuReducer(cy, getVariableName, [], EDITOR_MODES.EDIT);

/*
function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}
*/
