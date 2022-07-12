import styles from './NutritionValue.module.css'

interface IProps {
  title: string;
  value: number;
}

function NutritionValue({title, value}: IProps) {

  return (
    <div className={styles.value}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_main-default text_color_inactive">{value}</p>
    </div>
  )
}

export default NutritionValue;
