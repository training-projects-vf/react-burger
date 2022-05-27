import { ingredientDetails } from '../../utils/propTypes.js';
import styles from './IngredientDetails.module.css'

export function IngredientDetails(props) {
  const { ingredient } = props;

  console.log(props)

  return (
    <section className={styles.section}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <div className={styles.container_nutrition_values}>
        <div className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>

      </div>
    </section>
  )
}

IngredientDetails.propTypes = ingredientDetails;
