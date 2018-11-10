import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import Presentation from './presentation';
import icecream from '../../static/icecream';
import scale from '../../static/scale';

const examplesJSON = {
  icecream,
  scale,
};

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.loaderRef = React.createRef();
  }

  getCyJSON = () => this.context.cy.json().elements;

  handleLoad = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      // @TODO validate model
      this.context.cy.json({ elements: json });
      this.context.cy.layout({ name: 'dagre' }).run();
    } catch (error) {
      // TODO warn user
      console.error(error.message);
    }
  }

  handleFile = (e) => {
    const files = (e.target.files || []);
    if (files.length < 1) { return; }
    const jsonFile = files[0];
    const reader = new FileReader();
    reader.onloadend = this.handleLoad;
    reader.readAsText(jsonFile);
  }

  handleExampleChange = (e) => {
    const example = e.target.value;
    if (example) {
      this.context.cy.json({
        elements: examplesJSON[example],
      });
      this.context.cy.layout({ name: 'dagre' }).run();
    }
  }

  componentDidMount() {
    this.loaderRef.current.addEventListener('change', this.handleFile);
  }

  componentWillUnmount() {
    this.loaderRef.current.removeEventListener('change', this.handleFile);
  }

  render() {
    const { loaderRef, getCyJSON, handleExampleChange } = this;
    const examples = Object.keys(examplesJSON);
    return React.createElement(Presentation,
      { loaderRef, getCyJSON, examples, handleExampleChange }
    );
  }
}

HeaderContainer.contextType = CytoscapeContext;

export default HeaderContainer;
