import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import uuidv4 from 'uuid/v4';
import {
  factorCyJSON,
  factorOutputForFactor,
  factorInputForFactor,
  factorContainersCyJSON,
} from '../../cytoscape/cyJSONBuilders';
import Presentation from './presentation';

const factors = {
  NormalPDF: {
    inputs: ['mu', 'sigma'],
    outputs: ['z'],
  },
  PoissonPDF: {
    inputs: ['lambda'],
    outputs: ['x'],
  },
  BernoulliPDF: {
    inputs: ['p'],
    outputs: ['x'],
  },
};

class FactorLibraryContainer extends React.Component {
  makeOnClick = factorFunctionName => () => this.addFactor(factorFunctionName);

  addFactor = (factorFunctionName) => {
    const { cy } = this.context;
    if (!cy) { return; }
    const factorDefinition = factors[factorFunctionName];
    const factorNodeJSON = factorCyJSON(uuidv4(), factorFunctionName);
    const factorNode = cy.add(factorNodeJSON);
    cy.add(factorContainersCyJSON(factorNode.id()));
    const inputNodesJSON = factorDefinition.inputs.map(
      input => factorInputForFactor(input, factorNode),
    );
    const outputNodesJSON = factorDefinition.outputs.map(
      output => factorOutputForFactor(output, factorNode),
    );

    cy.add(inputNodesJSON);
    cy.add(outputNodesJSON);
  }

  render() {
    const { makeOnClick } = this;
    return React.createElement(Presentation, {
      factors,
      makeOnClick,
    });
  }
}

FactorLibraryContainer.contextType = CytoscapeContext;

export default FactorLibraryContainer;
