import { NODE_TYPES } from './constants';

export default function buildProcessCommands(cy) {
  const exportJSONCommand = {
    content: 'Export Graph JSON',
    select: function() {
      // Todo: validity check for unique names, DAG (for now)
      const variables = cy.nodes(`node[type="${NODE_TYPES.VARIABLE}"]`).map(variableNode => ([
        variableNode.data().name,
        {
          type: 'variable',
          variableType: variableNode.data().variableType,
        }
      ]));

      const factors = cy.nodes(`node[type="${NODE_TYPES.FACTOR}"]`).map(factorNode => {
        const inputs = factorNode.incomers().filter('node').map(inputNode => inputNode.data().name);
        const outputs = factorNode.outgoers().filter('node').map(outputNode => outputNode.data().name);
        return [
          `${inputs.join(',')}=>${outputs.join(',')}`,
          {
            type: 'factor',
            inputs,
            outputs,
          }
        ];
      });

      const nodeMap = [...variables, ...factors].reduce((acc, [name, node]) => ({...acc, [name]: node }), {});
      const json = JSON.stringify(nodeMap);
      console.log(json);
    }
  };

  return { exportJSONCommand };
};
