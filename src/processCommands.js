import { NODE_TYPES } from './constants';
import { arrayToObject } from './utils';
import { getVariableCyJSON, getEdgeCyJSON } from './graphCommands';
import { getFactorCyJSON, getFactorInputCyJSON, getFactorOutputCyJSON } from './factorCommands';
export default function buildProcessCommands(cy) {
  const exportJSONCommand = {
    content: 'Export Graph JSON',
    select: function() {
      // Todo: validity check for unique names, DAG (for now)
      const variables = cy.nodes(`node[type="${NODE_TYPES.VARIABLE}"]`).map(variableNode => ([
        variableNode.data().name,
        {
          type: variableNode.data().type,
          variableType: variableNode.data().variableType,
        }
      ]));
      let factor_inc = 0;
      const factors = cy.nodes(`node[type="${NODE_TYPES.FACTOR}"]`).map(factorNode => {
        const children = factorNode.children()
        const inputs = arrayToObject(
          children.filter(`node[type="${NODE_TYPES.FACTOR_INPUT}"]`)
          .map(input => [
            input.data().name,
            input.incomers().filter('node').map(incomer => incomer.data().name)
          ])
          .map(([k, v]) => [k, v[0]])
        );

        const outputs = arrayToObject(
          children.filter(`node[type="${NODE_TYPES.FACTOR_OUTPUT}"]`)
          .map(output => [
            output.data().name,
            output.outgoers().filter('node').map(outgoer => outgoer.data().name)
          ])
        );

        return [
          `phi_${factor_inc}`,
          {
            type: factorNode.data().type,
            inputs,
            outputs,
          }
        ];
      });

      const nodeMap = [...variables, ...factors].reduce((acc, [name, node]) => ({...acc, [name]: node }), {});
      const json = JSON.stringify(nodeMap);
      document.getElementById('namer').value = json;
    }
  };


  const importJSONCommand = {
    content: 'Import graph JSON',
    select: function() {
      cy.elements().remove()
      const json = document.getElementById('namer').value;
      const nodeMap = JSON.parse(json);
      const nodes = Object.entries(nodeMap)
      const loadTypes = [NODE_TYPES.VARIABLE, NODE_TYPES.FACTOR];
      const [variables, factors] = loadTypes.map(
        loadType => nodes.filter(([k, v]) => v.type == loadType)
      );
      
      cy.add(variables.map(([name, v]) => getVariableCyJSON(name, v.variableType, name)));
     
      cy.add(factors.map(([name, f]) => getFactorCyJSON(name, name)));

      cy.add(factors.map(([name, f]) => Object.entries(f.inputs)
        .map(([inputName, variableName]) => getFactorInputCyJSON(
          inputName,
          name,
          inputName
        ))
      ).flat());

      cy.add(factors.map(([name, f]) => Object.entries(f.outputs)
        .map(([outputName, variableName]) => getFactorOutputCyJSON(
          outputName,
          name,
          outputName
        ))
      ).flat());      

      cy.add(factors.map(([name, f]) => Object.entries(f.inputs)
        .map(([inputName, variableName]) => getEdgeCyJSON(variableName, inputName))
      ).flat());

      cy.add(factors.map(([name, f]) => Object.entries(f.outputs)
        .map(([outputName, variableName]) => getEdgeCyJSON(outputName, variableName))
      ).flat());
    }
  };

  return { importJSONCommand, exportJSONCommand };
};
