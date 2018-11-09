import React from 'react';
import PropTypes from 'prop-types';
import { CytoscapeContext } from 'react-cytoscape-tools';
import { ThemeConsumer } from 'styled-components';

const variableNames = 'abcdefghijklmnopqrstuvwxyz';
const testName = existingName => name => existingName === name;

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: null, variableNameIndex: 0, variableNameLoop: 0 };
  }

  destroyMenu = () => {
    if (this.state.menu) { this.state.menu.destroy(); }
  }

  buildCommand = commandBuilder => commandBuilder(
    this.props.cy,
    this.getVariableName,
  );

  getVariableName = () => {
    const existingNames = this.props.cy.nodes().map(node => node.data().name);
    let { variableNameIndex, variableNameLoop } = this.state;
    let name = null;
    while (!name || existingNames.filter(testName(name)).length > 0) {
      name = `${variableNames[variableNameIndex % variableNames.length]}${
        variableNameLoop > 0 ? variableNameLoop : ''
      }`;

      variableNameIndex += 1;
      if (variableNameIndex % variableNames.length === 0) {
        variableNameLoop += 1;
      }
    }

    this.setState({ variableNameIndex, variableNameLoop });
    return name;
  }

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
    if (this.props !== prevProps) {
      this.buildMenus(this.props);
    }
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
