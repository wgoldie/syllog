import { EDITOR_MODES, NODE_TYPES } from "./constants";

/*
 * Builds the command list for each context menu 
 * for the current mode. Returns an object of the
 * format { selector: [commands] } 
 */
function buildCommandLists(cy, commands, mode) {
  const {
    queryNodeCommand,
    latentNodeCommand,
    evidenceNodeCommand,
    factorNodeCommand,
    addInputCommand,
    addOutputCommand,
    edgeCommand,
    rmCommand,
    setLatentCommand,
    setEvidenceCommand,
    setQueryCommand,
    exportJSONCommand,
    importJSONCommand,
    layoutCommand,
    renameNodeCommand,
    selectFactorFunctionCommand
  } = commands;

  var nodeBase = [edgeCommand, rmCommand, renameNodeCommand];

  switch (mode) {
    case EDITOR_MODES.EDIT:
      return {
        [`node[type="${NODE_TYPES.VARIABLE}"]`]: [
          ...nodeBase,
          setLatentCommand,
          setEvidenceCommand,
          setQueryCommand
        ],
        [`node[type="${NODE_TYPES.FACTOR}"]`]: [
          ...nodeBase,
          addInputCommand,
          addOutputCommand,
          selectFactorFunctionCommand
        ],
        edge: [rmCommand],
        [`node[type="${NODE_TYPES.FACTOR_INPUT}"]`]: nodeBase,
        [`node[type="${NODE_TYPES.FACTOR_OUTPUT}"]`]: nodeBase,
        core: [
          layoutCommand,
          latentNodeCommand,
          factorNodeCommand,
          importJSONCommand,
          exportJSONCommand
        ]
      };
    default:
      throw `Invalid editor mode "${mode}".`;
  }
}

/*
 * Gets the appropriate context menu objects
 * for the current editor mode.
 * The previous context menu objects
 * must be provided for clean destruction and replacement.
 */
export function contextMenuReducer(cy, commands, menus, mode) {
  menus.forEach(function(menu) {
    menu.destroy();
  });
  const commandLists = buildCommandLists(cy, commands, mode);
  return Object.entries(commandLists).map(([selector, commands]) =>
    cy.cxtmenu({
      selector,
      commands,
      fillColor: "rgba(255,255,255,0.25)"
    })
  );
}