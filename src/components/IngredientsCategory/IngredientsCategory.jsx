import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import style from './IngredientsCategory.module.css';

import { ingredientType } from '../../utils/propTypes';
import { IngredientDetails } from "../IngredientDetails/IndgredientDetails";
import { Ingredient } from "../Ingredient/Ingredient";
import { Modal } from "../Modal/Modal";
import { SCRUTINIZE_INGREDIENT_REQUEST, SCRUTINIZE_INGREDIENT_CLOSE } from "../../redux/actions/ingredientsActions";

export const IngredientsCategory = forwardRef((props, ref) => {
  const { categoryIngredients } = props;
  const { ruCategoryName } = props.category;
  const { isIngredientPopupOpen } = useSelector(store => store.ingredients)
  const dispatch = useDispatch();

  function onClose() {
    dispatch({ type: SCRUTINIZE_INGREDIENT_CLOSE })
  }

  function handleClick(item) {
    dispatch({ type: SCRUTINIZE_INGREDIENT_REQUEST, payload: item })
  }

  return (
    <>
      <div
        className={style.container_category}
      >
        <p
          ref={ref}
          className={`text text_type_main-medium ${style.title}`}
        >
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

        {isIngredientPopupOpen && <Modal
          title="Детали ингредиента"
          onClose={onClose}
        >
          <IngredientDetails />
        </Modal>
        }

      </div>
    </>
  )
});

IngredientsCategory.propTypes = {
  categoryIngredients: PropTypes.arrayOf(ingredientType).isRequired,
}
