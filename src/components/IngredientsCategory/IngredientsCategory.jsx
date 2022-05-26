import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import { IngredientDetails } from "../IngredientDetails/IndgredientDetails";
import { useState } from "react";

export function IngredientsCategory(props) {
  const { ingredients } = props;
  const { categoryMarker, ruCategoryName } = props.category;
  const categoryIngredientsList = ingredients.filter(item => item.type === categoryMarker)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function onClose() {
    setIsPopupOpen(false);
  }

  function onClick(e) {
    setIsPopupOpen(true)
  }

  return (
    <>
      <div className={style.container_category}>
        <p className={`text text_type_main-medium ${style.title}`}>{ruCategoryName}</p>
        <div className={style.container_ingredients}>
          {
            categoryIngredientsList.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <div className={style.container_ingredient} onClick={onClick}>
                    <img src={item.image} alt="ingredient" />
                    <Counter count={1} size="default" />
                    <div className={style.container_price}>
                      <p className="text text_type_digits-default">{item.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>

                    <p className={`text text_type_main-default ${style.name}`}>{item.name}</p>
                  </div>

                  <IngredientDetails
                    ingredient={item}
                    isOpen={isPopupOpen}
                    onClose={onClose}
                  />
                </React.Fragment>

              )
            })
          }
        </div>
      </div>


    </>
  )
}

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}
