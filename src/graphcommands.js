export default function buildGraphCommands(cy) {
  /*
   * Creates a node with the given type
   */
  const nodeCommand = (type) => ({
    content: `${type} Node`,
    select: function(ele, ev) {
      cy.add({
        data: {
          'name': type,
          'inc': 0,
          'nodeType': type
        },
        position: ev.position
      })
    }
  });

  const queryNodeCommand = nodeCommand('query');
  const evidenceNodeCommand = nodeCommand('evidence');
  const latentNodeCommand = nodeCommand('latent');

  /* 
   * Begins drawing a new edge at
   * the selected node. Node that we
   * must first register some edge handle
   * behavior hooks.
   */
  const eh = cy.edgehandles({})
  eh.disable()
  cy.on('ehstop', function(){ eh.disable() })
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
    queryNodeCommand,
    evidenceNodeCommand,
    latentNodeCommand,
    edgeCommand,
    rmCommand
  }; 
}
