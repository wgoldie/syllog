import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import uuidv4 from 'uuid/v4';
import { NODE_TYPES } from '../../constants/cytoscape';
import {
  factorCyJSON,
  factorChildCyJSON,
} from '../../cytoscape/cyJSONBuilders';
import Presentation from './presentation';
import defaultFactors from '../../static/factors';

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
    if (!cy) { return; }

    const { factors } = this.state;
    const definition = factors[factorFunctionName];
    const {
      x1,
      y1,
      w,
      h,
    } = cy.extent();

    const x = x1 + (w / 2);
    const y = y1 + (h / 2);

    const factorNodeJSON = factorCyJSON(
      uuidv4(),
      factorFunctionName,
      { x, y },
    );

    const factorNode = cy.add(factorNodeJSON);

    const spacing = 35;
    const inputNodesJSON = definition.inputs.map(
      (inputName, idx) => factorChildCyJSON(
        inputName,
        NODE_TYPES.FACTOR_INPUT,
        { y, x: x + idx * spacing },
      ),
    );
    const outputNodesJSON = definition.outputs.map(
      (outputName, idx) => factorChildCyJSON(
        outputName,
        NODE_TYPES.FACTOR_OUTPUT,
        { y: y + spacing, x: x + idx * spacing },
      ),
    );

    const inputs = cy.add(inputNodesJSON);
    const outputs = cy.add(outputNodesJSON);
    const children = inputs.union(outputs);
    children.move({
      parent: factorNode.id(),
    });
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
