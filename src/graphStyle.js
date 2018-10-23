import { NODE_TYPES, VARIABLE_TYPES } from './constants';

/*
 * Returns a json object that can be 
 * provided to cytoscape as a style.
 */
export function getStyle(isDirected) {
  const style = [
    {
      selector: `node[type="${NODE_TYPES.VARIABLE}"]`,
      style: {
        shape: 'ellipse',
        'border-width':'2',
        'background-color': 'white',
        'label': function(ele) {
          return ele.data('name')
        }
      }
    },
    {
      selector: `node[type="${NODE_TYPES.FACTOR}"]`,
      style: {
        shape: 'square',
        'border-width':'2',
        'background-color': 'white',
        'label': function(ele) {
          return ele.data('name')
        }
      }
    },
    {
      selector: 'node[color]',
      style: {'border-color':'data(color)'}
    },
    {
      selector: `node[variableType="${VARIABLE_TYPES.EVIDENCE}"]`,
      style: {'background-color': 'grey'}
    },
    {
      selector: `node[variableType="${VARIABLE_TYPES.LATENT}"]`,
      style: {'background-color': 'white'}
    },
    {
      selector: `node[variableType="${VARIABLE_TYPES.QUERY}"]`,
      style: {'background-color': 'blue'}
    },
    {
      selector: 'edge',
      style: (isDirected ?
      { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle', 'target-arrow-color': 'grey' }
      : {'target-arrow-shape':'none'})
    }
  ]

  return style;
}


