export default function buildNodeTypeCommands(cy) {
  export const latentCommand = {
    content: 'Latent', 
    select: function(ele) {
      ele.data('nodeType', 'latent')
    },
  } 

  export const queryCommand = {
    content: 'Query', 
    select: function(ele) { 
      ele.data('nodeType', 'query')
    },
  } 

  export const evidenceCommand = {
    content: 'Evidence',
    select: function(ele) {
      ele.data('nodeType', 'evidence')
    },
  } 

  return {
    latentCommand,
    queryCommand,
    evidenceCommand
  }; 
}
