import React from 'react';
import ContextMenu from '../ContextMenu';
import { NODE_TYPES } from '../../constants/cytoscape';
import { drawEdge, rmElement, addLatent } from '../../graphCommands/graph';
import { renameNode, selectFactorFunction } from '../../graphCommands/variableNameCommands';
import { addFactorInput, addFactorOutput, addFactor } from '../../graphCommands/factorCommands';
import { relayoutGraph } from '../../graphCommands/layoutCommands';

const nodeBase = [drawEdge, rmElement, renameNode];
const menuDefinitions = {
  [`node[type="${NODE_TYPES.VARIABLE}"]`]: [
    ...nodeBase,
  ],
  [`node[type="${NODE_TYPES.FACTOR}"]`]: [
    rmElement,
    renameNode,
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
  ],
};

const EditModeMenus = () => (
  Object.entries(menuDefinitions).map(
    ([selector, commandBuilders]) => (
      <ContextMenu
        key={selector}
        selector={selector}
        commandBuilders={commandBuilders}
      />
    ),
  )
);

export default EditModeMenus;
