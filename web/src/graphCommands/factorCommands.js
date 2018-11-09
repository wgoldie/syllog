import { NODE_TYPES } from '../constants/cytoscape';
import {
  factorCyJSON,
  factorChildCyJSON,
} from '../cytoscape/cyJSONBuilders';

/*
 * Creates a factor node
 */
export const addFactor = (cy, getVariableName) => ({
  content: 'Factor',
  select(ele, ev) {
    const factor = cy.add(
      factorCyJSON(
        getVariableName(),
        'None',
        ev.position,
      ),
    );

    const child = cy.add(factorChildCyJSON(
      getVariableName(),
      NODE_TYPES.FACTOR_OUTPUT,
      ev.position,
    ));
    child.move({ parent: factor.id() });
  },
});

export const addFactorInput = (cy, getVariableName) => ({
  content: 'Add input',
  select(ele, ev) {
    const { type, id } = ele.data();
    if (type !== NODE_TYPES.FACTOR) return;
    const child = cy.add(factorChildCyJSON(
      getVariableName(),
      NODE_TYPES.FACTOR_OUTPUT,
      ev.position,
    ));

    child.move({ parent: id });
  },
});

export const addFactorOutput = (cy, getVariableName) => ({
  content: 'Add output',
  select(ele, ev) {
    const { type, id } = ele.data();
    if (type !== NODE_TYPES.FACTOR) return;
    const child = cy.add(factorChildCyJSON(
      getVariableName(),
      NODE_TYPES.FACTOR_INPUT,
      ev.position,
    ));

    child.move({ parent: id });
  },
});
