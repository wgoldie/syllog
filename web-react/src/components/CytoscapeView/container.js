import React from 'react';
import Presentation from './presentation';
import attachCytoscape from '../../cytoscape';

class CytoscapeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cyRef = React.createRef();
  }

  componentDidMount() {
    const cyNode = this.cyRef.current;
    attachCytoscape(cyNode);
  }

  render() {
    const { cyRef } = this;
    return Presentation({ cyRef });
  }
}

export default CytoscapeContainer;
