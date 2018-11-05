import React from 'react';
import { CytoscapeContext } from 'react-cytoscape-tools';
import Presentation from './presentation';

class HeaderContainer extends React.Component {
  getCyJSON = () => this.context.cy.json();

  render() {
    const { getCyJSON } = this;
    return React.createElement(Presentation, { getCyJSON });
  }
}

HeaderContainer.contextType = CytoscapeContext;

export default HeaderContainer;
