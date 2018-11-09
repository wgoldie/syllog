import uuidv4 from 'uuid/v4';
import { NODE_TYPES } from '../constants/cytoscape';

/*
 * CyJSON for a variable node
 *
 * name must be unique among variable and factor names
 * variableType must be in VARIABLE_TYPES
 */
export const variableCyJSON = (
  name,
  variableType,
  position = null,
) => ({
  data: {
    id: uuidv4(),
    name,
    type: NODE_TYPES.VARIABLE,
    variableType,
  },
  ...(position ? { position } : {}),
});

/*
 * CyJSON for an edge
 *
 * source and target must be Cytoscape ids
 */
export const edgeCyJSON = (source, target) => ({
  data: {
    id: uuidv4(),
    source,
    target,
  },
});

/*
 * CyJSON for a factor node
 *
 * name must be unique among variable and factor names
 */
export const factorCyJSON = (
  name,
  factorFunction = 'None',
  position = null,
) => ({
  data: {
    id: uuidv4(),
    name,
    factorFunction,
    type: NODE_TYPES.FACTOR,
  },
  ...(position ? { position } : {}),
});

/*
 * CyJSON for a factor input or output node
 *
 * name must be unique among this factor's inputs and outputs
 * childType must be in NODE_TYPES and must be either FACTOR_INPUT or FACTOR_OUTPUT
 *
 * Note that you must manually move this node
 * to the correct parent factor after adding it
 * to the graph.
 */
export const factorChildCyJSON = (
  name,
  childType,
  position = null,
) => ({
  data: {
    id: uuidv4(),
    name,
    type: childType,
  },
  ...(position ? { position } : {}),
});
