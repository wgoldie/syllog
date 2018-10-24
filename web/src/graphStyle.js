import { NODE_TYPES } from './constants';

/*
 * Returns a json object that can be
 * provided to cytoscape as a style.
 */
export default function getStyle() {
  const style = [
    {
      selector: 'node, edge',
      style: {
        'font-family': 'Courier, monospace',
        'font-size': 8,
        'border-color': '#D9A036',
        color: '#fff',
        'background-color': 'rgba(0,0,0,0.0)',
        'text-halign': 'center',
        'text-valign': 'center',
        'line-color': '#8C6723',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#8C6723',
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
      selector: `node[type="${NODE_TYPES.FACTOR_OUTPUT_CONTAINER}"]`,
      style: {
        shape: 'square',
        label: 'Outputs',
        'text-valign': 'top',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_INPUT_CONTAINER}"]`,
      style: {
        shape: 'square',
        label: 'Inputs',
        'text-valign': 'top',
      },
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_INPUT}"],node[type="${
        NODE_TYPES.FACTOR_OUTPUT
      }"]`,
      style: {
        label: 'data(name)',
      },
    },
    {
      selector: 'node[color]',
      style: { 'border-color': 'data(color)' },
    },
  ];

  return style;
}
