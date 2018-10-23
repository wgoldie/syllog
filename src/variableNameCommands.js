import { getEdgeCyJSON } from './graphCommands';
import { NODE_TYPES } from './constants';

export default function buildVariableNameCommands(cy) {
  const renameNodeCommand = ({
    content: 'Rename',
    select: function(ele) {
      const { id, ...data } = ele.data();
      const rename = window.prompt(`Rename ${id} to:`, id);

      if (rename) {
        if (cy.getElementById(rename).length > 0) {
          console.log("Name already in use.");
          return;
        }

        const newNode = cy.add({
          group: 'nodes',
          data: { ...data, id: rename },
          position: ele.position()
        });
        
        const newId = newNode.id();

        (ele
          .incomers()
          .filter('edge')
          .move({ target: newId })
        );
   
        (ele
          .outgoers()
          .filter('edge')
          .move({ source: newId })
        );
 
        // Update inputs and outputs
        (ele
          .descendants()
          .filter(`node[factor="${id}"]`)
          .forEach(
            descendant => descendant.data('factor', rename)
          )
        );       

        if (ele.data().type == NODE_TYPES.FACTOR) {
          // Update input and output containers
          (ele
            .children()
            .move({ parent: newId })
          );
        }
  

        ele.remove();
      }
    }
  });

  return { renameNodeCommand };
}
