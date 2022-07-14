import { forwardRef } from "react";
import styles from './IngredientsCategory.module.css';
import { Ingredient } from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";
import { TIngredient, TCategory } from "../../types/types";

interface IProps {
  categoryIngredients: Array<TIngredient>;
  category: TCategory;
}

export const IngredientsCategory = forwardRef<HTMLParagraphElement, IProps>((props, ref) => {
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
                  state={{ backgroundLocation: location }}
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
