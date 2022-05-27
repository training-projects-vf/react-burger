import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import { IngredientDetails } from "../IngredientDetails/IndgredientDetails";
import { Modal } from "../Modal/Modal";
import { useState, forwardRef } from "react";

export const IngredientsCategory = forwardRef((props, ref) => {
  const { categoryIngredients } = props;
  const { ruCategoryName } = props.category;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState({});

  function onClose() {
    setIsPopupOpen(false);
  }

  function onClick(item) {
    setClickedIngredient(item);
    setIsPopupOpen(true);
  }

  const Ingredient = (properties) => {
    const { item } = properties;
    return (
      <>
        <div className={style.container_ingredient} onClick={(e) => onClick(item)} >
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
            categoryIngredients.map((item) => {
              return (
                <Ingredient item={item} key={item._id} />
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
