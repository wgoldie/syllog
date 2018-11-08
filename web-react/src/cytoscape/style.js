import { NODE_TYPES } from '../constants/cytoscape';

/*
 * Returns a json object that can be
 * provided to cytoscape as a style.
 */
export default function getStyle(theme) {
  const style = [
    {
      selector: 'node, edge',
      style: {
        'font-family': 'Consolas, Courier, monospace',
        'font-size': 8,
        'border-color': theme.border,
        color: theme.color,
        'background-color': theme.neutralBackground,
        'text-halign': 'center',
        'text-valign': 'center',
        'line-color': theme.border,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': theme.border,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 0.5,
      },
    },
    {
      selector: 'node',
      style: {
        'border-width': '0.5',
        label: 'data(name)',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.VARIABLE}"]`,
      style: {
        shape: 'ellipse',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_INPUT}"]`,
      style: {
        'text-valign': 'top',
        'shape': 'polygon',
        'shape-polygon-points': '-1 -1 1 -1 0 1 -1 -1',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_OUTPUT}"]`,
      style: {
        'text-valign': 'bottom',
        'shape': 'polygon',
        'shape-polygon-points': '-1 1 1 1 0 -1 -1 1',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR}"]`,
      style: {
        shape: 'square',
        'border-style': 'dashed',
        'text-valign': 'top',
        label: (ele) => {
          const d = ele.data();
          return `${d.factorFunction}:${d.name}`;
        },
      },
    },
    {
      selector: 'node[color]',
      style: { 'border-color': 'data(color)' },
    },
  ];

  return style;
}
