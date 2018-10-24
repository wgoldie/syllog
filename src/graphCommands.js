import { NODE_TYPES, VARIABLE_TYPES } from './constants';
import uuidv4 from 'uuid/v4';

export const getVariableCyJSON = (name, variableType) => ({
  data: {
    id: uuidv4(),
    name,
    type: NODE_TYPES.VARIABLE, 
    variableType: variableType,
  }, 
});

export const getEdgeCyJSON = (source, target) => ({
  data: {
    id: uuidv4(),
    source,
    target,
  }
});

export default function buildGraphCommands(cy, getVariableName) {
  /*
   * Creates a node with the given type
   */
  const variableCommand = (variableType) => ({
    content: `${variableType} Node`,
    select: function(ele, ev) {
      cy.add({
        ...getVariableCyJSON(getVariableName(), variableType),
        position: ev.position
      });
    }
  })


  /* 
   * Begins drawing a new edge at
   * the selected node. Node that we
   * must first register some edge handle
   * behavior hooks.
   */
  const eh = cy.edgehandles({})
  eh.disable()
  cy.on('ehstop', () => eh.disable())
  cy.on('ehcomplete', (e, source, target, added) => {


    if (!(
      (source.data().type === NODE_TYPES.FACTOR_OUTPUT
        && target.data().type === NODE_TYPES.VARIABLE)
      || (source.data().type === NODE_TYPES.VARIABLE
        && target.data().type === NODE_TYPES.FACTOR_INPUT)))
    {
      console.log("Edges only allowed from variables to factor inputs and from factor outputs to variables");
      cy.remove(added);
      return;
    }

    // Remove other inputs to the target node
    //if (target.indegree() != 1) {
    //  target.incomers().filter('edge').filter(edge => edge.data().source !== source.id()).remove();
    //}
    /*
    if (
      source.data().type === NODE_TYPES.FACTOR 
      && target.data().type === NODE_TYPES.FACTOR 
    ) {
      cy.remove(added);
      console.log("No edges allowed between factor nodes");
      return;
    }

    if (
      source.data().type === NODE_TYPES.VARIABLE
      && target.data().type === NODE_TYPES.VARIABLE 
    ) {
      // insert a factor automatically if the user connects two variables
      const factorPosition = added[0].midpoint()
      cy.remove(added);
      const newFactor = cy.add({
        group: 'nodes',
        position: factorPosition,
        data: { type: NODE_TYPES.FACTOR, name: 'factor' }
      });
      cy.add([
        { group: 'edges',
          data: {
            source: source.id(),
            target: newFactor.id(),
          },
        },
        { group: 'edges',
          data: {
            source: newFactor.id(), 
            target: target.id(),
          },
        },
      ]);
      cy.remove(added);
      console.log("No edges allowed between two variable nodes");
      return;
    }
    */

  });

  const edgeCommand = {
    content: 'Edge',
    select: function(ele) {
      eh.enable()
      eh.start(ele) 
    }
  }

  /*
   * Removes the selected node
   */
  const rmCommand = {
    content: 'Remove',
    select: function(ele) {
      ele.remove()
    }
  }

  return {
    queryNodeCommand: variableCommand(VARIABLE_TYPES.QUERY),
    evidenceNodeCommand: variableCommand(VARIABLE_TYPES.EVIDENCE),
    latentNodeCommand: variableCommand(VARIABLE_TYPES.LATENT),
    edgeCommand,
    rmCommand
  }; 
}
