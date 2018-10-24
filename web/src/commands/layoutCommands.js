export default function buildLayoutCommands(cy) {
  const layoutCommand = {
    content: 'Relayout graph',
    select() {
      cy.layout({ name: 'dagre' }).run();
    },
  };

  return { layoutCommand };
}
