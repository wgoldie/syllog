import { NODE_TYPES } from './constants';
import { arrayToObject } from './utils';
import { getVariableCyJSON, getEdgeCyJSON } from './graphCommands';
import { getFactorCyJSON, getFactorInputCyJSON, getFactorOutputCyJSON } from './factorCommands';
export default function buildProcessCommands(cy) {
  const exportJSONCommand = {
    content: 'Export Graph JSON',
    select: function() {
      const elementsCyJSON = cy.json().elements;
      const exportJSON = {
        nodes: elementsCyJSON.nodes.map(({ data }) => ({ data })),
        edges: elementsCyJSON.edges.map(({ data }) => ({ data })),
      }
      document.getElementById('namer').value = JSON.stringify(exportJSON);
      // Todo: validity check for unique names, DAG (for now)
      /*const variables = cy.nodes(`node[type="${NODE_TYPES.VARIABLE}"]`).map(variableNode => ([
        variableNode.id(),
        {
          type: variableNode.data().type,
          variableType: variableNode.data().variableType,
        }
      ]));
      let factor_inc = 0;
      const factors = cy.nodes(`node[type="${NODE_TYPES.FACTOR}"]`).map(factorNode => {
        const children = factorNode.children()
        const inputs = arrayToObject(
          children.filter(`node[type="${NODE_TYPES.FACTOR_INPUT_CONTAINER}"]`)
          .first()
          .children()
          .map(input => [
            input.id(),
            input.incomers().filter('node').map(incomer => incomer.id())
          ])
          .map(([k, v]) => [k, v[0]])
        );

        const outputs = arrayToObject(
          children.filter(`node[type="${NODE_TYPES.FACTOR_OUTPUT_CONTAINER}"]`)
          .map(output => [
            output.id(),
            output.outgoers().filter('node').map(outgoer => outgoer.id())
          ])
        );

        return [
          factorNode.id(),
          {
            type: factorNode.data().type,
            inputs,
            outputs,
          }
        ];
      });

      const nodeMap = [...variables, ...factors].reduce((acc, [id, node]) => ({...acc, [id]: node }), {});
      const json = JSON.stringify(nodeMap);
      */
    }
  };


  const importJSONCommand = {
    content: 'Import graph JSON',
    select: function() {
      cy.elements().remove()
      const json = document.getElementById('namer').value;
      const elementsCyJSON = JSON.parse(json);
      cy.json({elements: elementsCyJSON});
      /*
      const nodes = Object.entries(nodeMap)
      const loadTypes = [NODE_TYPES.VARIABLE, NODE_TYPES.FACTOR];
      const [variables, factors] = loadTypes.map(
        loadType => nodes.filter(([k, v]) => v.type == loadType)
      );
      
      cy.add(variables.map(([id, v]) => getVariableCyJSON(id, v.variableType, id)));
     
      cy.add(factors.map(([id, f]) => getFactorCyJSON(id)));

      cy.add(factors.map(([factorId, f]) => Object.entries(f.inputs)
        .map(([inputId, variableId]) => getFactorInputCyJSON(
          inputId,
          factorId,
        ))
      ).flat());

      cy.add(factors.map(([factorId, f]) => Object.entries(f.outputs)
        .map(([outputId, variableId]) => getFactorOutputCyJSON(
          outputId,
          factorId,
        ))
      ).flat());      

      cy.add(factors.map(([factorId, f]) => Object.entries(f.inputs)
        .map(([inputId, variableId]) => getEdgeCyJSON(variableId, inputId))
      ).flat());

      cy.add(factors.map(([factorId, f]) => Object.entries(f.outputs)
        .map(([outputId, variableId]) => getEdgeCyJSON(outputId, variableId))
      ).flat());
      */
    }
  };

  return { importJSONCommand, exportJSONCommand };
};
