import { getEdgeCyJSON } from './graphCommands';
import { NODE_TYPES } from './constants';

export default function buildVariableNameCommands(cy) {
  const renameNodeCommand = ({
    content: 'Rename',
    select: function(ele) {
      const {type, name, factor} = ele.data();
      const rename = window.prompt(`Rename ${name} to:`, name);
      
      // If the user exits the dialog, do nothing
      if (!rename) { return; }

      // Check for name collisions in correct scope
      if (type == NODE_TYPES.FACTOR_INPUT || type == NODE_TYPES.FACTOR_OUTPUT) {
        if (cy
          .nodes()
          .filter(`node[factor="${factor}"]`)
          .filter(`node[name="${rename}"]`).length > 0
        ) {
          window.alert("Name already in use.");
          return;
        }

      } else {
        if (cy.nodes().filter(`node[name="${rename}"]`).length > 0) {
          window.alert("Name already in use.");
          return;
        }
      }

      ele.data('name', rename);
    }
  });

  return { renameNodeCommand };
}
