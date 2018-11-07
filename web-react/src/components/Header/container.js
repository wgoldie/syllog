import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import Presentation from './presentation';

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

  componentDidMount() {
    this.loaderRef.current.addEventListener('change', this.handleFile);
  }

  componentWillUnmount() {
    this.loaderRef.current.removeEventListener('change', this.handleFile);
  }

  render() {
    const { loaderRef, getCyJSON } = this;
    return React.createElement(Presentation, { loaderRef, getCyJSON });
  }
}

HeaderContainer.contextType = CytoscapeContext;

export default HeaderContainer;
