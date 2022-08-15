import { forwardRef } from "react";
import styles from './IngredientsCategory.module.css';
import { Ingredient } from "../Ingredient/Ingredient";
import { TIngredient, TCategory } from "../../types/types";

interface IProps {
  categoryIngredients: Array<TIngredient>;
  category: TCategory;
}

export const IngredientsCategory = forwardRef<HTMLParagraphElement, IProps>((props, ref) => {
  const { categoryIngredients } = props;
  const { ruCategoryName } = props.category;

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
            categoryIngredients.map((ingredient, index) => {
              return (
                <Ingredient
                  key={index}
                  item={ingredient}
                />
              )
            })
          }
        </div>

      </div>
    </>
  )
});
