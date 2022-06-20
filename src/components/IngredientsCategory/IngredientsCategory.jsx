import { forwardRef } from "react";
import PropTypes from 'prop-types';
import styles from './IngredientsCategory.module.css';
import { ingredientType } from '../../utils/propTypes';
import { Ingredient } from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";

export const IngredientsCategory = forwardRef((props, ref) => {
  const { categoryIngredients } = props;
  const { ruCategoryName } = props.category;
  const location = useLocation();

  return (
    <>
      <div
        className={styles.container_category}
      >
        <p
          ref={ref}
          className={`text text_type_main-medium ${styles.title}`}
        >
          {ruCategoryName}
        </p>
        <div className={styles.container_ingredients}>
          {
            categoryIngredients.map((ingredient) => {
              const { _id: id } = ingredient;
              return (
                <Link
                  key={id}
                  className={styles.link}
                  to={`/ingredients/${id}`}
                  state={{ background: location }}
                >

                  <Ingredient
                    item={ingredient}
                  />
                </Link>
              )
            })
          }
        </div>

      </div>
    </>
  )
});

IngredientsCategory.propTypes = {
  categoryIngredients: PropTypes.arrayOf(ingredientType).isRequired,
}
