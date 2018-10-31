import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import CytoscapeContext from '../../cytoscape/context';

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: null };
  }

  destroyMenu = () => {
    if (this.state.menu) { this.state.menu.destroy(); }
  }

  buildCommand = commandBuilder => commandBuilder(
    this.context.cy,
    uuidv4,
  );

  buildMenus = (prevProps) => {
    const { selector, commandBuilders } = this.props;
    if (
      (prevProps.commandBuilders !== commandBuilders)
      || (prevProps.selector !== selector)
    ) {
      this.destroyMenu();
      const commands = commandBuilders.map(this.buildCommand);
      const menu = this.context.cy.cxtmenu({
        selector,
        commands,
        fillColor: 'rgba(255,255,255,0.25)',
      });

      this.setState({ menu });
    }
  }

  componentDidUpdate(prevProps) {
    this.buildMenus(prevProps);
  }

  componentDidMount() {
    this.buildMenus({});
  }

  componentWillUnmount() {
    this.destroyMenu();
    this.setState({ menu: null });
  }

  render() {
    return '';
  }
}

ContextMenu.contextType = CytoscapeContext;

ContextMenu.propTypes = {
  selector: PropTypes.string.isRequired,
  commandBuilders: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default ContextMenu;
