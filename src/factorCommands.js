import { NODE_TYPES, VARIABLE_TYPES } from './constants';

export const getFactorCyJSON = (id) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR,
  }, 
});

export const getFactorContainersCyJSON = id => ([
  {
    data: {
      id: `${id}__inputs`,
      type: NODE_TYPES.FACTOR_INPUT_CONTAINER,
      parent: id,
    },
  }, {
    data: {
      id: `${id}__outputs`,
      type: NODE_TYPES.FACTOR_OUTPUT_CONTAINER,
      parent: id,
    }
  }
])

export const getFactorInputCyJSON = (id, parentFactorId) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR_INPUT,
    parent: `${parentFactorId}__inputs`,
  },
});

export const getFactorOutputCyJSON = (id, parentFactorId) => ({
  data: {
    id,
    type: NODE_TYPES.FACTOR_OUTPUT,
    parent: `${parentFactorId}__outputs`,
  },
});


export function makeFactor(cy, getVariableName, position) {
  const factor = cy.add({
    ...getFactorCyJSON(getVariableName()),
    position
  });

  const containers = cy.add(getFactorContainersCyJSON(factor.id()));

  const output = cy.add({
    ...getFactorOutputCyJSON(getVariableName(), factor.id()),
  });
  return [factor, output]
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
      cy.add(getFactorInputCyJSON(getVariableName(), id));
    }
  });

  const addOutputCommand = ({ 
    content: "Add output",
    select: function(ele) {
      const { id, type } = ele.data();
      if (type !== NODE_TYPES.FACTOR) return;
      cy.add(getFactorOutputCyJSON(getVariableName(), id));
    }
  });

  return { factorNodeCommand, addInputCommand, addOutputCommand };
}
 
