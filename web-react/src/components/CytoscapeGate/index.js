import React from 'react';
import PropTypes from 'prop-types';
import CytoscapeContext from '../../cytoscape/context';

class CytoscapeGate extends React.Component {
  render() {
    return (this.context.cy
      ? this.props.children
      : this.props.defaultView);
  }
}

CytoscapeGate.defaultProps = {
  defaultView: React.createElement('div'),
};

CytoscapeGate.propTypes = {
  children: PropTypes.node.isRequired,
  defaultView: PropTypes.node,
};

CytoscapeGate.contextType = CytoscapeContext;

export default CytoscapeGate;
