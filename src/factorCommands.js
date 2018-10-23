import { NODE_TYPES, VARIABLE_TYPES } from './constants';

import uuidv4 from 'uuid/v4';

export const getFactorCyJSON = (id) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR,
  }, 
});

export const getFactorContainersCyJSON = id => ([
  {
    data: {
      id: uuidv4(),
      type: NODE_TYPES.FACTOR_INPUT_CONTAINER,
      parent: id,
    },
  }, {
    data: {
      id: uuidv4(),
      type: NODE_TYPES.FACTOR_OUTPUT_CONTAINER,
      parent: id,
    }
  }
])

export const getFactorInputCyJSON = (id, parentId, factorId) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR_INPUT,
    parent: parentId,
    factor: factorId,
  },
});

export const getFactorOutputCyJSON = (id, parentId, factorId) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR_OUTPUT,
    parent: parentId,
    factor: factorId,
  },
});


const factorInputForFactor = (name, factorEle) => (
  (getFactorInputCyJSON(
    name,
    factorEle.children(`node[type="${NODE_TYPES.FACTOR_INPUT_CONTAINER}"]`).first().id(),
    factorEle.id() 
  ))
);

const factorOutputForFactor = (name, factorEle) => (
  (getFactorOutputCyJSON(
    name,
    factorEle.children(`node[type="${NODE_TYPES.FACTOR_OUTPUT_CONTAINER}"]`).first().id(),
    factorEle.id() 
  ))
);

export function makeFactor(cy, getVariableName, position) {
  const factor = cy.add({
    ...getFactorCyJSON(getVariableName()),
    position
  });

  const containers = cy.add(getFactorContainersCyJSON(factor.id()));

  cy.add(factorOutputForFactor(getVariableName(), factor));
}


export default function buildGraphCommands(cy, getVariableName) {
  /*
   * Creates a factor node 
   */
  const factorNodeCommand = ({
    content: `Factor`,
    select: function(ele, ev) {
      makeFactor(cy, getVariableName, ev.position);
    }
  });

  const addInputCommand = ({ 
    content: "Add input",
    select: function(ele) {
      const { id, type } = ele.data();
      if (type !== NODE_TYPES.FACTOR) return;
      cy.add(factorInputForFactor(getVariableName(), ele));
    }
  });

  const addOutputCommand = ({ 
    content: "Add output",
    select: function(ele) {
      const { id, type } = ele.data();
      if (type !== NODE_TYPES.FACTOR) return;

      cy.add(factorOutputForFactor(getVariableName(), ele));
    }
  });

  return { factorNodeCommand, addInputCommand, addOutputCommand };
}
 
