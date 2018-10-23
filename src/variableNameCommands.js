import { getEdgeCyJSON } from './graphCommands';

export default function buildVariableNameCommands(cy) {
  const renameNodeCommand = ({
    content: 'Rename',
    select: function(ele) {
      const rename = window.prompt(`Rename ${ele.id()} to:`, ele.id())
      if (rename) {
        if (cy.getElementById(rename).length > 0) {
          console.log("Name already in use.");
          return;
        }

        const { id, ...data } = ele.data();
        const newNode = cy.add({
          group: 'nodes',
          data: { ...data, id: rename },
          position: ele.position()
        });

        cy.add(ele
          .incomers()
          .filter('node')
          .map(incomer => getEdgeCyJSON(incomer.id(), rename))
        );

        cy.add(ele
          .outgoers()
          .filter('node')
          .map(outgoer => getEdgeCyJSON(rename, outgoer.id()))
        );

        ele.children().forEach(child => child.data('parent', rename));
        ele.remove();
      }
    }
  });

  return { renameNodeCommand };
}
