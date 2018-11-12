import { VARIABLE_TYPES, NODE_TYPES } from '../constants/cytoscape';

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

export const exportTikz = cy => ({
  content: 'LaTeX Drawing',
  select() {
    const nodes = cy.filter('node');
    const edges = cy.filter('edge');
    let lines = '';
    let factorLines = '';
    const xpos = nodes.map(node => [node.position('x'), node]);
    const xsorted = xpos.sort((a, b) => a[0] - b[0]).map(pos => pos[0]);
    const xmin = xsorted[0];
    const xmax = xsorted[xsorted.length - 1];
    const ypos = nodes.map(node => [node.position('y'), node]);
    const ysorted = ypos.sort((a, b) => a[0] - b[0]).map(pos => pos[0]);
    const ymin = ysorted[0];
    const ymax = ysorted[ysorted.length - 1];

    lines += '\\begin{tikzpicture}[scale=' + (10/Math.max(xsorted[xsorted.length-1],xsorted[xsorted.length-1])).toFixed(2) + ']\n'
    // lines += '\\begin{tikzpicture}[scale=10]\n'
    //
    lines += '%%tikz -l bayesnet\n';
    let type;
    nodes.forEach((node) => {
      const name = node.data().name;
      const xidx = xsorted.indexOf(node.position('x'));
      const yidx = ysorted.indexOf(node.position('y'));
      const x = xsorted[xidx] - xmin;
      const y = ysorted[yidx] - ymin;

      switch (node.data('type')) {
        case NODE_TYPES.FACTOR_OUTPUT:
        case NODE_TYPES.FACTOR_INPUT:
          type = 'const';
        case NODE_TYPES.VARIABLE: {
          switch (node.data('variableType') || '') {
            case VARIABLE_TYPES.EVIDENCE:
              type = 'obs';
              break;
            case VARIABLE_TYPES.QUERY:
            case VARIABLE_TYPES.LATENT:
              type = 'latent';
              break;
            default:
              break;
          }

          const xOut = (5 * x / xmax).toFixed(2);
          const yOut = (-5 * y / ymax).toFixed(2);

          lines += `\
          \\node[${type}] \
          (${name}) at (${xOut}, ${yOut}) \
          {$${name}$} \
          ;\n`;

          break;
        }
        case NODE_TYPES.FACTOR: {
          const children = node.children();
          const inputs = children.filter(
            child => child.data().type === NODE_TYPES.FACTOR_INPUT,
          ).map(child => child.data().name).join(',');
          const outputs = children.filter(
            child => child.data().type === NODE_TYPES.FACTOR_OUTPUT,
          ).map(child => child.data().name).join(',');

          factorLines += `\
          \\factor \
          at (${(5 * x / xmax).toFixed(2)}, ${(-5 * y / ymax).toFixed(2)}) \
          {$${name}$} {} {${inputs}} {${outputs}} \
          ;\n`;
          break;
        }
        default:
          type = '';
      }
      lines += factorLines;

      // lines += 'node['+type+(below? ', below=of '+below:'')+(right? ', right=of '+right:'')+'] ('+id+') {$'+(node.data('name')||'')+'_'+(node.data('inc')||'0')+'$} ;\n'
    });

    edges.forEach((edge) => {
      const director = true ? '' : '[-]';
      const sourceName = edge.source().data('name');
      const targetName = edge.target().data('name');
      lines += `\\edge${director} {${sourceName}} {${targetName}} ;\n`;
    });

    lines += '\\end{tikzpicture}';
    const escaped = lines.replace(/_/g, '{\\_}');
    console.log(escaped);
  },
});
