import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NutritionValue from '../NutritionValue/NutritionValue';
import styles from './IngredientDetails.module.css'
import { TIngredient } from '../../types/types';

export function IngredientDetails() {
  const { id } = useParams();

  const {
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
    image_large
  } = useSelector((store: any) => store.ingredients.ingredients
    .find((ingredient: TIngredient) => ingredient._id === id)
  );

  if (!id) { return null };

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
