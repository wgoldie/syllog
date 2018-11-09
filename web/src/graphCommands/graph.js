import { NODE_TYPES, VARIABLE_TYPES } from '../constants/cytoscape';
import { variableCyJSON } from '../cytoscape/cyJSONBuilders';

/*
 * Creates a node with the given type
 */
export const addVariable = (variableType, generic = false) => (cy, getVariableName) => ({
  content: (generic ? 'Variable' : `${variableType} Variable`),
  select(ele, ev) {
    cy.add(variableCyJSON(
      getVariableName(),
      variableType,
      ev.position,
    ));
  },
});

/*
 * Event handler to enforce edge drawing rules of factor graphs
 */
const checkEdgeValid = cy => (e, source, target, added) => {
  if (
    (
      (target.data().type === NODE_TYPES.FACTOR_OUTPUT
        && source.data().type === NODE_TYPES.VARIABLE)
      || (
        target.data().type === NODE_TYPES.VARIABLE
        && source.data().type === NODE_TYPES.FACTOR_INPUT
      )
    )
  ) {
    added.move({ source: target.id(), target: source.id() });
  } else if (
    !(
      (source.data().type === NODE_TYPES.FACTOR_OUTPUT
        && target.data().type === NODE_TYPES.VARIABLE)
      || (
        source.data().type === NODE_TYPES.VARIABLE
        && target.data().type === NODE_TYPES.FACTOR_INPUT
      )
    )
  ) {
    console.log(
      'Edges only allowed from variables to factor inputs and from factor outputs to variables',
    );
    cy.remove(added);
  }
};

/*
 * Starts drawing an edge from the selected node to any other
 */
export const drawEdge = (cy) => {
  // Register some edge behavior hooks
  const eh = cy.edgehandles({});
  eh.disable();
  cy.on('ehstop', () => eh.disable());
  cy.on('ehcomplete', checkEdgeValid(cy));
  return {
    content: 'Edge',
    select(ele) {
      eh.enable();
      eh.start(ele);
    },
  };
};

/*
 * Removes the selected node
 */
export const rmElement = () => ({
  content: 'Remove',
  select(ele) {
    ele.descendants().remove();
    ele.remove();
  },
});

export const addQuery = addVariable(VARIABLE_TYPES.QUERY);
export const addEvidence = addVariable(VARIABLE_TYPES.EVIDENCE);
export const addLatent = addVariable(VARIABLE_TYPES.LATENT);
export const addLatentGeneric = addVariable(VARIABLE_TYPES.LATENT, true);
