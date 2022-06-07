import { useState, forwardRef } from "react";
import PropTypes from 'prop-types';

import style from './IngredientsCategory.module.css';

import { ingredientType } from '../../utils/propTypes';
import { IngredientDetails } from "../IngredientDetails/IndgredientDetails";
import { Ingredient } from "../Ingredient/Ingredient";
import { Modal } from "../Modal/Modal";

export const IngredientsCategory = forwardRef((props, ref) => {
  const { categoryIngredients } = props;
  const { ruCategoryName } = props.category;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState({});

  function onClose() {
    setIsPopupOpen(false);
  }

  function handleClick(item) {
    setClickedIngredient(item);
    setIsPopupOpen(true);
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
            categoryIngredients.map((item) => {
              return (
                <Ingredient
                  item={item}
                  key={item._id}
                  handleClick={handleClick} />
              )
            })
          }
        </div>

        {isPopupOpen && <Modal
          title="Детали ингредиента"
          onClose={onClose}
        >

          <IngredientDetails ingredient={clickedIngredient} />

        </Modal>
        }

      </div>
    </>
  )
});

IngredientsCategory.propTypes = {
  categoryIngredients: PropTypes.arrayOf(ingredientType).isRequired,
}
