import { NODE_TYPES, VARIABLE_TYPES } from './constants';

export default function buildGraphCommands(cy, getVariableName) {

  /*
   * Creates a factor node 
   */
  const factorNodeCommand = ({
    content: `Factor`,
    select: function(ele, ev) {
      cy.add({
        data: {
          'name': 'factor',
          'type': NODE_TYPES.FACTOR, 
        }, 
        position: ev.position
      })
    }
  }) 
  
  /*
   * Creates a node with the given type
   */
  const variableCommand = (variableType) => ({
    content: `${variableType} Node`,
    select: function(ele, ev) {
      cy.add({
        data: {
          'name': getVariableName(),
          'type': NODE_TYPES.VARIABLE, 
          'variableType': variableType,
        }, 
        position: ev.position
      })
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
      return;
    }

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
    factorNodeCommand,
    edgeCommand,
    rmCommand
  }; 
}
