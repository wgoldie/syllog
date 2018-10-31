import React from 'react';
import PropTypes from 'prop-types';
import CytoscapeContext from '../../cytoscape/context';

class CytoscapeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cy: null };
  }

  handleSetCy = cy => this.setState({ cy });

  render() {
    const { children } = this.props;
    const { handleSetCy } = this;
    const { cy } = this.state;
    const value = { cy, setCy: handleSetCy };
    return (
      <CytoscapeContext.Provider value={value}>
        {children}
      </CytoscapeContext.Provider>
    );
  }
}

CytoscapeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CytoscapeProvider;
