import cytoscape from "cytoscape";
import "dagre";
import "cytoscape";

// cytoscape plugin imports
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import edgehandles from "cytoscape-edgehandles";

// cytoscape plugin activation
cytoscape.use(cxtmenu);
cytoscape.use(dagre);
cytoscape.use(edgehandles);

import { getStyle } from "./graphStyle";
import { EDITOR_MODES } from "./constants";
import { contextMenuReducer } from "./contextMenus";

import buildGraphCommands from "./graphCommands";
import buildVariableTypeCommands from "./variableTypeCommands";
import buildProcessCommands from "./processCommands";
import buildLayoutCommands from "./layoutCommands";
import buildFactorCommands from "./factorCommands";
import buildVariableNameCommands from "./variableNameCommands";

// Init cytoscape graph library
const cy = cytoscape({
  container: document.getElementById("cy"),
  layout: {
    name: "dagre"
  }
});

// Default to directed graph
cy.json({
  style: getStyle(true)
  //'elements': [{ group: 'nodes', data: {id: 0}}]
});

let variableNameIndex = 0;
const variableNames = "abcdefghijklmnopqrstuvwxyz";
const loop = variableNames.length;
const getVariableName = function() {
  let name = null;
  while (!name || cy.nodes().filter(`node[name="${name}"]`).length > 0) {
    name = `${variableNames[variableNameIndex % loop]}${
      variableNameIndex > loop ? Math.floor(variableNameIndex / loop) : ""
    }`;
    variableNameIndex += 1;
  }

  return name;
};

const builders = [
  buildGraphCommands,
  buildVariableTypeCommands,
  buildProcessCommands,
  buildLayoutCommands,
  buildFactorCommands,
  buildVariableNameCommands
];

const commands = builders.reduce(
  (acc, builder) => ({ ...builder(cy, getVariableName), ...acc }),
  {}
);
var menus = contextMenuReducer(cy, commands, [], EDITOR_MODES.EDIT);

/*
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