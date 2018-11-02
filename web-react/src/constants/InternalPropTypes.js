import PropTypes from 'prop-types';

const factor = PropTypes.shape({
  inputs: PropTypes.arrayOf(PropTypes.string).isRequired,
  outputs: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const factors = PropTypes.objectOf(factor);

export default {
  factors,
  factor,
};
