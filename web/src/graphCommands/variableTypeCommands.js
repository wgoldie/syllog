import { VARIABLE_TYPES } from '../constants';

/*
 * Set a variable node to a specific type
 * for PGM analysis
 */
export const setVariableType = type => () => ({
  content: `Set to ${type}`,
  select(ele) {
    ele.data('variableType', type);
  },
});

export const setLatent = setVariableType(VARIABLE_TYPES.LATENT);
export const setQuery = setVariableType(VARIABLE_TYPES.QUERY);
export const setEvidence = setVariableType(VARIABLE_TYPES.EVIDENCE);
