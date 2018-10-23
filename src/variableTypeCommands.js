import { VARIABLE_TYPES } from './constants';

export default function buildVariableTypeCommands(cy) {
  /*
   * Set a variable node to a specific type
   * for PGM analysis
   */
  const setVariableTypeCommand = (type) => ({
    content: `Set to ${type}`, 
    select: function(ele) {
      ele.data('variableType', type)
    },
  }); 

  return {
    setLatentCommand: setVariableTypeCommand(VARIABLE_TYPES.LATENT),
    setQueryCommand: setVariableTypeCommand(VARIABLE_TYPES.QUERY),
    setEvidenceCommand: setVariableTypeCommand(VARIABLE_TYPES.EVIDENCE),
  }; 
}
