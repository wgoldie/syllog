import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import uuidv4 from 'uuid/v4';
import {
  factorCyJSON,
  factorOutputForFactor,
  factorInputForFactor,
} from '../../cytoscape/cyJSONBuilders';
import Presentation from './presentation';

const defaultFactors = {};

// TODO warn user
const warnInvalid = name => console.log(`\
Invalid Factor JSON. \
Must consist of a map of factor function names \
to objects of shape \
{ inputs: ['input1', 'input2'....], \
outputs: ['output1', 'output2', ...] } \
each with at least one output.
Error occurred in key ${name}.
`);

const allStrings = arr => arr.every(el => (
  typeof el === 'string'
  || el instanceof String
));

class FactorLibraryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.loaderRef = React.createRef();
    this.state = { factors: defaultFactors };
  }

  makeOnClick = factorFunctionName => () => this.addFactor(factorFunctionName);

  handleFile = (e) => {
    const files = (e.target.files || []);
    if (files.length < 1) { return; }
    const jsonFile = files[0];
    const reader = new FileReader();
    reader.onloadend = this.handleLoad;
    reader.readAsText(jsonFile);
  }

  handleLoad = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!(typeof json === 'object')) {
        return warnInvalid();
      }

      const valid = Object.entries(json).every(([name, { inputs, outputs }]) => {
        if (
          !outputs
          || !outputs.length
          || outputs.length < 1
          || !allStrings(outputs)
        ) {
          warnInvalid(name);
          return false;
        }

        if (inputs && !allStrings(inputs)) {
          warnInvalid(name);
          return false;
        }
        return true;
      });
      if (valid) {
        const oldFactors = this.state.factors;
        this.setState({ factors: { ...oldFactors, ...json } });
      }
    } catch (error) {
      // TODO warn user
      console.error(error.message);
    }
  }

  addFactor = (factorFunctionName) => {
    const { cy } = this.context;
    const { factors } = this.state;
    if (!cy) { return; }
    const factorDefinition = factors[factorFunctionName];
    const factorNodeJSON = factorCyJSON(uuidv4(), factorFunctionName);
    const factorNode = cy.add(factorNodeJSON);
    const factorNodeId = factorNode.id();
    const inputNodesJSON = factorDefinition.inputs.map(
      input => factorInputForFactor(input, factorNodeId),
    );
    const outputNodesJSON = factorDefinition.outputs.map(
      output => factorOutputForFactor(output, factorNodeId),
    );

    cy.add(inputNodesJSON);
    cy.add(outputNodesJSON);
  }

  // TODO: warn and confirm on this
  clearFactors = () => this.setState({ factors: {} });

  componentDidMount() {
    this.loaderRef.current.addEventListener('change', this.handleFile);
  }

  componentWillUnmount() {
    this.loaderRef.current.removeEventListener('change', this.handleFile);
  }

  render() {
    const {
      makeOnClick,
      loaderRef,
      clearFactors,
    } = this;
    const { factors } = this.state;
    return React.createElement(Presentation, {
      loaderRef,
      factors,
      makeOnClick,
      clearFactors,
    });
  }
}

FactorLibraryContainer.contextType = CytoscapeContext;

export default FactorLibraryContainer;
