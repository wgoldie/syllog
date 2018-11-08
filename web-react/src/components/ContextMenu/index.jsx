import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { CytoscapeContext } from 'react-cytoscape-tools';
import { ThemeConsumer } from 'styled-components';

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: null };
  }

  destroyMenu = () => {
    if (this.state.menu) { this.state.menu.destroy(); }
  }

  buildCommand = commandBuilder => commandBuilder(
    this.props.cy,
    uuidv4,
  );

  buildMenus = (prevProps) => {
    const { selector, commandBuilders, theme } = this.props;
    if (
      (prevProps.commandBuilders !== commandBuilders)
      || (prevProps.selector !== selector)
    ) {
      this.destroyMenu();
      const commands = commandBuilders.map(this.buildCommand);
      const menu = this.props.cy.cxtmenu({
        selector,
        commands,
        fillColor: theme.altBackground,
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

ContextMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  cy: PropTypes.object.isRequired,
  selector: PropTypes.string.isRequired,
  commandBuilders: PropTypes.arrayOf(PropTypes.func).isRequired,
};

const ContextMenuWrapper = props => (
  <CytoscapeContext.Consumer>
    { cyContext => (
      <ThemeConsumer>
        { theme => (
          <ContextMenu {...props} cy={cyContext.cy} theme={theme} />)
        }
      </ThemeConsumer>)
    }
  </CytoscapeContext.Consumer>);

export default ContextMenuWrapper;
