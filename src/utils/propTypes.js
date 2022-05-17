import PropTypes from 'prop-types';

export const categoriesPropTypes = PropTypes.arrayOf(PropTypes.shape({
  categoryMarker: PropTypes.string.isRequired,
  ruCategoryName: PropTypes.string.isRequired,
}).isRequired).isRequired

export const ingredientsPropTypes = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
}).isRequired).isRequired
