import React from 'react';
import CytoscapeContext from '../../cytoscape/context';
import Presentation from './presentation';
import attachCytoscape from '../../cytoscape';

class CytoscapeViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cyRef = React.createRef();
  }

  componentDidMount() {
    const cyNode = this.cyRef.current;
    const cy = attachCytoscape(cyNode);
    this.context.setCy(cy);
  }

  render() {
    const { cyRef } = this;
    return Presentation({ cyRef });
  }
}

CytoscapeViewContainer.contextType = CytoscapeContext;

export default CytoscapeViewContainer;
