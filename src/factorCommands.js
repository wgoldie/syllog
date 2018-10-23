import { NODE_TYPES, VARIABLE_TYPES } from './constants';

export const getFactorCyJSON = (name, id = null) => ({
    data: {
      'name': name,
      'type': NODE_TYPES.FACTOR,
      ...(id ? { id } : {})
    }, 
});

export const getFactorInputCyJSON = (name, parentFactorId, id = null) => ({
    data: {
      'name': name,
      'type': NODE_TYPES.FACTOR_INPUT,
      'parent': parentFactorId,
      ...(id ? { id } : {})
    },
});

export const getFactorOutputCyJSON = (name, parentFactorId, id = null) => ({
    data: {
      'name': name,
      'type': NODE_TYPES.FACTOR_OUTPUT,
      'parent': parentFactorId,
      ...(id ? { id } : {})
    },
});


export function makeFactor(cy, getVariableName, position) {
  const factor = cy.add({
    ...getFactorCyJSON(getVariableName()),
    position
  });

  const output = cy.add({
    ...getFactorOutputCyJSON(getVariableName(), factor.id()),
    position
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
 
