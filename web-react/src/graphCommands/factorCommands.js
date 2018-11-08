import { NODE_TYPES } from '../constants/cytoscape';
import {
  makeFactor,
  factorInputForFactor,
  factorOutputForFactor,
} from '../cytoscape/cyJSONBuilders';

/*
 * Creates a factor node
 */
export const addFactor = (cy, getVariableName) => ({
  content: 'Factor',
  select(ele, ev) {
    makeFactor(cy, getVariableName, ev.position);
  },
});

export const addFactorInput = (cy, getVariableName) => ({
  content: 'Add input',
  select(ele) {
    const { type } = ele.data();
    if (type !== NODE_TYPES.FACTOR) return;
    cy.add(factorInputForFactor(getVariableName(), ele.id()));
  },
});

export const addFactorOutput = (cy, getVariableName) => ({
  content: 'Add output',
  select(ele) {
    const { type } = ele.data();
    if (type !== NODE_TYPES.FACTOR) return;
    cy.add(factorOutputForFactor(getVariableName(), ele.id()));
  },
});
