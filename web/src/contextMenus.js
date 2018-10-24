import { EDITOR_MODES, NODE_TYPES } from './constants';
import { drawEdge, rmElement, addLatent } from './commands/graphCommands';
import { renameNode, selectFactorFunction } from './commands/variableNameCommands';
import { addFactorInput, addFactorOutput, addFactor } from './commands/factorCommands';
import { relayoutGraph } from './commands/layoutCommands';
import { importJSON, exportJSON } from './commands/processCommands';

/*
 * Builds the command list for each context menu
 * for the current mode. Returns an object of the
 * format { selector: [commands] }
 */
function buildCommandLists(cy, mode) {
  const nodeBase = [drawEdge, rmElement, renameNode];

  switch (mode) {
    case EDITOR_MODES.EDIT:
      return {
        [`node[type="${NODE_TYPES.VARIABLE}"]`]: [
          ...nodeBase,
        ],
        [`node[type="${NODE_TYPES.FACTOR}"]`]: [
          ...nodeBase,
          addFactorInput,
          addFactorOutput,
          selectFactorFunction,
        ],
        edge: [rmElement],
        [`node[type="${NODE_TYPES.FACTOR_INPUT}"]`]: nodeBase,
        [`node[type="${NODE_TYPES.FACTOR_OUTPUT}"]`]: nodeBase,
        core: [
          addLatent,
          relayoutGraph,
          addFactor,
          importJSON,
          exportJSON,
        ],
      };
    default:
      throw Error(`Invalid editor mode "${mode}".`);
  }
}

/*
 * Gets the appropriate context menu objects
 * for the current editor mode.
 * The previous context menu objects
 * must be provided for clean destruction and replacement.
 */
export default function contextMenuReducer(cy, getVariableName, menus, mode) {
  menus.forEach((menu) => {
    menu.destroy();
  });
  const commandLists = buildCommandLists(cy, mode);
  return Object.entries(commandLists).map(([selector, commandList]) => cy.cxtmenu({
    selector,
    commands: commandList.map(commandBuilder => commandBuilder(cy, getVariableName)),
    fillColor: 'rgba(255,255,255,0.25)',
  }));
}
