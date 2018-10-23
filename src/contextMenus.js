import { EDITOR_MODES } from './constants';

/*
 * Builds the command list for each context menu 
 * for the current mode. Returns an object of the
 * format { selector: [commands] } 
 */
function buildCommandLists(cy, commands, mode) {
  var coreBase = [
    // layoutCommand,
    // directedSwitchCommand(isDirected),
    // tikzCommand
  ];
  
  const {
    queryNodeCommand,
    latentNodeCommand,
    evidenceNodeCommand,
    factorNodeCommand,
    edgeCommand,
    rmCommand,
    setLatentCommand,
    setEvidenceCommand,
    setQueryCommand,
    exportJSONCommand,
    layoutCommand
  } = commands; 

  switch (mode) {
    case EDITOR_MODES.EDIT:
      return {
        'node': [
          edgeCommand,
          rmCommand,
          setLatentCommand,
          setEvidenceCommand,
          setQueryCommand,
        ],
        'core': [
          ...coreBase,
          layoutCommand,
          latentNodeCommand,
          factorNodeCommand,
          exportJSONCommand,
        ],
      }
    default:
      throw `Invalid editor mode "${mode}".`;
  }
}

/*
 * Gets the appropriate context menu objects
 * for the current editor mode.
 * The previous context menu objects
 * must be provided for clean destruction and replacement.
 */
export function contextMenuReducer(cy, commands, menus, mode) {
  menus.forEach(function(menu) { menu.destroy() }) 
  const commandLists = buildCommandLists(cy, commands, mode);
  return Object.entries(commandLists).map(
    ([selector, commands]) => cy.cxtmenu({
      selector,
      commands
    })
  );
   /*
  
  if(mode == 'edit') { 
    nodeCommands = nodeBaseCommands.concat()
    evidenceCommands = nodeCommands
    queryCommands = nodeCommands
    latentCommands = nodeCommands
    coreCommands = coreBaseCommands.concat()
  } else if(mode == 'analyze') {
    nodeCommands = nodeBaseCommands.concat([isDirected ? splitCommand : markovBlanketCommand])
    evidenceCommands = nodeCommands.concat([queryCommand, latentCommand]) 
    queryCommands = nodeCommands.concat([evidenceCommand, latentCommand]) 
    latentCommands = nodeCommands.concat([queryCommand, evidenceCommand]) 
    nodeCommands.concat([queryCommand, latentCommand]) 
    coreCommands = coreBaseCommands.concat([modeSwitchCommand('edit')])
  }
  
 */
}
