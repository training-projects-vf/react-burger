import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/propTypes';

export function IngredientsCategory(props) {
  const { ingredients } = props;
  const { categoryMarker, ruCategoryName } = props.category;
  const categoryIngredientsList = ingredients.filter(item => item.type === categoryMarker)

  return (
    <div className={style.container_category}>
      <p className={`text text_type_main-medium ${style.title}`}>{ruCategoryName}</p>
      <div className={style.container_ingredients}>
        {
          categoryIngredientsList.map((item) => {
            return (
              <div className={style.container_ingredient} key={item._id} onClick={props.openPopup}>
                <img src={item.image} alt="ingredient" />
                <Counter count={1} size="default" />
                <div className={style.container_price}>
                  <p className="text text_type_digits-default">{item.price}</p>
                  <CurrencyIcon type="primary" />
                </div>

                <p className={`text text_type_main-default ${style.name}`}>{item.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}
