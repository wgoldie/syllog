import cytoscape from 'cytoscape';
import 'dagre';
import 'cytoscape';

// cytoscape plugin imports
import cxtmenu from 'cytoscape-cxtmenu';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';

// cytoscape plugin activation
cytoscape.use(cxtmenu);
cytoscape.use(dagre);
cytoscape.use(edgehandles);

import { getStyle } from './graphstyle';
import { EDITOR_MODES } from './constants';
import { contextMenuReducer } from './contextMenus'

import buildGraphCommands from './graphCommands';
import buildNodeTypeCommands from './nodeTypeCommands';

// Init cytoscape graph library
const cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'dagre',
  },
});

// Default to directed graph
cy.json({
  'style': getStyle(true),
  //'elements': [{ group: 'nodes', data: {id: 0}}]
})

var commands = {...buildGraphCommands(cy)};
var menus = contextMenuReducer(cy, commands, [], EDITOR_MODES.EDIT);

/*
const variableNameIndex = 0;
const variableNames = 'abcdefghijklmnopqrstuvwyz'
const getVariableName = function() {
  variableNameIndex += 1
  return variableNames[variableNameIndex % 26]
}

var menus = []

function contextMenus(_mode, _isDirected) { 
}
contextMenus('edit')
document.onkeyup = function(e) {
  var c = String.fromCharCode(e.which);
  if (c.toLowerCase() === 'l') {
    cy.layout({ name: 'dagre' }).run()
  }
}

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
