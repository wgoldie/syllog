import { NODE_TYPES, VARIABLE_TYPES } from './constants';

/*
 * Returns a json object that can be 
 * provided to cytoscape as a style.
 */
export function getStyle(isDirected) {
  const style = [
    {
      selector: 'node, edge',
      style: {
        'font-family': 'Courier, monospace',
        'font-size': 8,
        'border-color': '#D9A036',
        'color': '#fff',
        'background-color': 'rgba(0,0,0,0.0)',
        'text-halign': 'center',
        'text-valign': 'center',
        'line-color': '#8C6723',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#8C6723',
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 0.5,
      }
    },
    {
      selector: 'node',
      style: {
        'border-width':'0.5',
        'label': 'data(id)'
      }
    },
    {
      selector: `node[type="${NODE_TYPES.VARIABLE}"]`,
      style: {
        shape: 'ellipse',
      }
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR}"]`,
      style: {
        shape: 'square',
        'border-style': 'dashed',
      }
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_INPUT}"]`,
      style: {
        shape: 'square',
      }
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR_OUTPUT}"]`,
      style: {
        shape: 'square',
      }
    },
    {
      selector: 'node[color]',
      style: {'border-color':'data(color)'}
    },
  ]

  return style;
}


