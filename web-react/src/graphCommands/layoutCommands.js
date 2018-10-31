export const relayoutGraph = cy => ({
  content: 'Relayout graph',
  select() {
    cy.layout({ name: 'dagre' }).run();
  },
});
