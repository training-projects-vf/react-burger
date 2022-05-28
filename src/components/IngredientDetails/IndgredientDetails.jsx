import { ingredientDetails } from '../../utils/propTypes.js';
import NutritionValue from '../NutritionValue/NutritionValue.jsx';
import styles from './IngredientDetails.module.css'

export function IngredientDetails(props) {
  const { ingredient } = props;

  return (
    <section className={styles.section}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={styles.ul}>
        <li><NutritionValue title="Калории,ккал" value={ingredient.calories} /></li>
        <li><NutritionValue title="Белки, г" value={ingredient.proteins} /></li>
        <li><NutritionValue title="Жиры, г" value={ingredient.fat} /></li>
        <li><NutritionValue title="Углеводы, г" value={ingredient.carbohydrates} /></li>
      </ul>
    </section>
  )
}

IngredientDetails.propTypes = ingredientDetails;
