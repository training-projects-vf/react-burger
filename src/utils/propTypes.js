import { string, number, object, bool, func, shape } from 'prop-types';

export const categoryType = shape({
  categoryMarker: string.isRequired,
  ruCategoryName: string.isRequired,
}).isRequired

export const ingredientType = shape({
  _id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string.isRequired,
  image_mobile: string.isRequired,
  image_large: string.isRequired,
}).isRequired

export const navLinkType = ({
  icon: object.isRequired,
  link: string.isRequired,
  caption: string.isRequired,
  isActive: bool.isRequired,
  onClick: func.isRequired,
})

export const modalType = ({
  title: string.isRequired,
  onClose: func,
  closeIcon: bool.isRequired,
})

export const ingredientDetails = ({
  ingredient: ingredientType,
})

export const nutritionValue = ({
  title: string.isRequired,
  value: number.isRequired,
})
