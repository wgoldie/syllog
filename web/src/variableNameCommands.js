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

  const selectFactorFunctionCommand = ({
    content: 'Select Function',
    select: function(ele) {
      const {factorFunction, type} = ele.data();
      if (type !== NODE_TYPES.FACTOR) { return; }
      const rename = window.prompt(`Change factor function from ${factorFunction} to:`, factorFunction);

      // If the user exits the dialog, do nothing
      if (!rename) { return; }
      ele.data('factorFunction', rename);
    }
  });

  return { selectFactorFunctionCommand, renameNodeCommand };
}
