export const exportJSON = cy => ({
  content: 'Export Graph JSON',
  select() {
    const elementsCyJSON = cy.json().elements || {};
    const exportJSONObj = {
      nodes: (elementsCyJSON.nodes || []).map(({ data }) => ({ data })),
      edges: (elementsCyJSON.edges || []).map(({ data }) => ({ data })),
    };
    document.getElementById('namer').value = JSON.stringify(exportJSONObj);
  },
});

export const importJSON = cy => ({
  content: 'Import graph JSON',
  select() {
    cy.elements().remove();
    const json = document.getElementById('namer').value;
    const elementsCyJSON = JSON.parse(json);
    cy.json({ elements: elementsCyJSON, layout: { name: 'dagre' } });
    cy.layout({ name: 'dagre' }).run();
  },
});
