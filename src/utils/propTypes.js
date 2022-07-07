import {
  string,
  // number,
  object,
  bool,
  func,
  shape
} from 'prop-types';

export const categoryType = shape({
  categoryMarker: string.isRequired,
  ruCategoryName: string.isRequired,
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
})
