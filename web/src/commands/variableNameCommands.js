import { NODE_TYPES } from '../constants';

/*
 * Renames a node using a prompt window.
 */
export const renameNode = cy => ({
  content: 'Rename',
  select(ele) {
    const { type, name, factor } = ele.data();
    const rename = window.prompt(`Rename ${name} to:`, name);

    // If the user exits the dialog, do nothing
    if (!rename) {
      return;
    }

    // Check for name collisions in correct scope
    if (type === NODE_TYPES.FACTOR_INPUT || type === NODE_TYPES.FACTOR_OUTPUT) {
      if (
        cy
          .nodes()
          .filter(`node[factor="${factor}"]`)
          .filter(`node[name="${rename}"]`).length > 0
      ) {
        window.alert('Name already in use.');
        return;
      }
    } else if (cy.nodes().filter(`node[name="${rename}"]`).length > 0) {
      window.alert('Name already in use.');
      return;
    }

    ele.data('name', rename);
  },
});

/*
 * Selects a factor function name
 * using a prompt window
 */
export const selectFactorFunction = () => ({
  content: 'Select Function',
  select(ele) {
    const { factorFunction, type } = ele.data();
    if (type !== NODE_TYPES.FACTOR) {
      return;
    }
    const rename = window.prompt(
      `Change factor function from ${factorFunction} to:`,
      factorFunction,
    );

    // If the user exits the dialog, do nothing
    if (!rename) {
      return;
    }
    ele.data('factorFunction', rename);
  },
});
