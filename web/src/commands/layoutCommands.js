export default function buildLayoutCommands(cy) {
  const layoutCommand = {
    content: "Relayout graph",
    select: function() {
      cy.layout({ name: "dagre" }).run();
    }
  };

  return { layoutCommand };
}
