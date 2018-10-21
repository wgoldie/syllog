/*
 * Returns a json object that can be 
 * provided to cytoscape as a style.
 */
export function getStyle(isDirected) {
  const style = [
    {
      selector: 'node',
      style: {
        shape: 'ellipse',
        'border-width':'2',
        'background-color': 'white',
        'label': function(ele) {
          return ele.data('name')+'_'+(ele.data('inc')|' ')
        }
      }
    },
    {
      selector: 'node[color]',
      style: {'border-color':'data(color)'}
    },
    {
      selector: 'node[nodeType="evidence"]',
      style: {'background-color': 'grey'}
    },
    {
      selector: 'node[nodeType="latent"]',
      style: {'background-color': 'white'}
    },
    {
      selector: 'node[nodeType="query"]',
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


