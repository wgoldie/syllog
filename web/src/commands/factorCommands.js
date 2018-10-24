import { NODE_TYPES } from '../constants';
import { factorChildCyJSON, factorContainersCyJSON, factorCyJSON } from '../cyJSONBuilders';

const factorInputForFactor = (name, factorEle) => factorChildCyJSON(
  name,
  factorEle
    .children(`node[type="${NODE_TYPES.FACTOR_INPUT_CONTAINER}"]`)
    .first()
    .id(),
  factorEle.id(),
  NODE_TYPES.FACTOR_INPUT,
);

const factorOutputForFactor = (name, factorEle) => factorChildCyJSON(
  name,
  factorEle
    .children(`node[type="${NODE_TYPES.FACTOR_OUTPUT_CONTAINER}"]`)
    .first()
    .id(),
  factorEle.id(),
  NODE_TYPES.FACTOR_OUTPUT,
);

export function makeFactor(cy, getVariableName, position) {
  const factor = cy.add({
    ...factorCyJSON(getVariableName()),
    position,
  });

  cy.add(factorContainersCyJSON(factor.id()));
  cy.add(factorOutputForFactor(getVariableName(), factor));
}

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
    cy.add(factorInputForFactor(getVariableName(), ele));
  },
});

export const addFactorOutput = (cy, getVariableName) => ({
  content: 'Add output',
  select(ele) {
    const { type } = ele.data();
    if (type !== NODE_TYPES.FACTOR) return;
    cy.add(factorOutputForFactor(getVariableName(), ele));
  },
});
