import uuidv4 from 'uuid/v4';
import { NODE_TYPES } from '../constants/cytoscape';

/*
 * CyJSON for a variable node
 *
 * name must be unique among variable and factor names
 * variableType must be in VARIABLE_TYPES
 */
export const variableCyJSON = (name, variableType) => ({
  data: {
    id: uuidv4(),
    name,
    type: NODE_TYPES.VARIABLE,
    variableType,
  },
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
 *
 * Should be inserted along with factorContainersCyJSON
 */
export const factorCyJSON = (name, factorFunction = 'None') => ({
  data: {
    id: uuidv4(),
    name,
    type: NODE_TYPES.FACTOR,
    factorFunction,
  },
});

/*
 * CyJSON for a factor node's input and output containers
 *
 * factorId should be the Cytoscape id of a valid factor node
 */
export const factorContainersCyJSON = factorId => [
  {
    data: {
      id: uuidv4(),
      type: NODE_TYPES.FACTOR_INPUT_CONTAINER,
      parent: factorId,
    },
  },
  {
    data: {
      id: uuidv4(),
      type: NODE_TYPES.FACTOR_OUTPUT_CONTAINER,
      parent: factorId,
    },
  },
];

/*
 * CyJSON for a factor input or output node
 *
 * name must be unique among this factor's inputs and outputs
 * parentId must be the parent factor node's input or output container's Cytoscape id
 * factorId must be the parent factor node's Cytoscape id
 * childType must be in NODE_TYPES and must be either FACTOR_INPUT or FACTOR_OUTPUT
 */
export const factorChildCyJSON = (name, parentId, factorId, childType) => ({
  data: {
    id: uuidv4(),
    name,
    type: childType,
    parent: parentId,
    factor: factorId,
  },
});

/*
 * Helper to produce CyJSON for
 * a factor's input with the given name.
 */
export const factorInputForFactor = (name, factorEle) => factorChildCyJSON(
  name,
  factorEle
    .children(`node[type="${NODE_TYPES.FACTOR_INPUT_CONTAINER}"]`)
    .first()
    .id(),
  factorEle.id(),
  NODE_TYPES.FACTOR_INPUT,
);

/*
 * Helper to produce CyJSON for
 * a factor's output with the given name.
 */
export const factorOutputForFactor = (name, factorEle) => factorChildCyJSON(
  name,
  factorEle
    .children(`node[type="${NODE_TYPES.FACTOR_OUTPUT_CONTAINER}"]`)
    .first()
    .id(),
  factorEle.id(),
  NODE_TYPES.FACTOR_OUTPUT,
);

/*
 * Builds a factor with input and output containers
 * and adds it to the graph.
 *
 * getVariableName must provide a unique name for the factor
 *
 * position is optional (format { x, y })
 * and will place the factor spatially
 */
export function makeFactor(cy, getVariableName, position = {}) {
  const factor = cy.add({
    ...factorCyJSON(getVariableName()),
    position,
  });

  cy.add(factorContainersCyJSON(factor.id()));
  cy.add(factorOutputForFactor(getVariableName(), factor));
}
