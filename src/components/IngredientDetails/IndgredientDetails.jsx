import { useSelector } from 'react-redux';
import NutritionValue from '../NutritionValue/NutritionValue.jsx';
import styles from './IngredientDetails.module.css'

export function IngredientDetails() {
  const {
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
    image_large
  } = useSelector(store => store.ingredients.ingredient);

  return (
    <section className={styles.section}>
      <img src={image_large} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <ul className={styles.ul}>
        <li><NutritionValue title="Калории,ккал" value={calories} /></li>
        <li><NutritionValue title="Белки, г" value={proteins} /></li>
        <li><NutritionValue title="Жиры, г" value={fat} /></li>
        <li><NutritionValue title="Углеводы, г" value={carbohydrates} /></li>
      </ul>
    </section>
  )
}
