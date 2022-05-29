import { nutritionValue } from '../../utils/propTypes';
import styles from './NutritionValue.module.css'

function NutritionValue(props) {
  const { title, value } = props;

  return (
    <div className={styles.value}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_main-default text_color_inactive">{value}</p>
    </div>
  )
}

NutritionValue.propTypes = nutritionValue;

export default NutritionValue;
