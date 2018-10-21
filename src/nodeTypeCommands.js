export default function buildNodeTypeCommands(cy) {
  /*
   * Set a node to a specific type
   * for PGM analysis
   */
  const setNodeTypeCommand = (type) => ({
    content: `Set to ${type}`, 
    select: function(ele) {
      ele.data('nodeType', type)
    },
  }); 

  return {
    setLatentCommand: setNodeTypeCommand('latent'),
    setQueryCommand: setNodeTypeCommand('query'),
    setEvidenceCommand: setNodeTypeCommand('evidence'),
  }; 
}
