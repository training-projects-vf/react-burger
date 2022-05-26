import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import { IngredientDetails } from "../IngredientDetails/IndgredientDetails";
import { useState, forwardRef } from "react";

export const IngredientsCategory = forwardRef((props, ref) => {
  const { ingredients } = props;
  const { categoryMarker, ruCategoryName } = props.category;
  const categoryIngredientsList = ingredients.filter(item => item.type === categoryMarker)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState({});

  function onClose() {
    setIsPopupOpen(false);
  }

  function onClick(e, item) {
    e.stopPropagation();
    setClickedIngredient(item);
    setIsPopupOpen(true);
  }

  const Ingredient = (properties) => {
    const { item } = properties;
    return (
      <>
        <div className={style.container_ingredient} onClick={(e) => onClick(e, item)} >
          <img src={item.image} alt="ingredient" />
          <Counter count={1} size="default" />
          <div className={style.container_price}>
            <p className="text text_type_digits-default">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-default ${style.name}`}>{item.name}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={style.container_category}>
        <p
          ref={ref}
          className={`text text_type_main-medium ${style.title}`}>
          {ruCategoryName}
        </p>
        <div className={style.container_ingredients}>
          {
            categoryIngredientsList.map((item) => {
              return (
                <Ingredient item={item} key={item._id} />
              )
            })
          }
        </div>

        {isPopupOpen && <IngredientDetails
          ingredient={clickedIngredient}
          isOpen={isPopupOpen}
          onClose={onClose}
        />}

      </div>
    </>
  )
});

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}
