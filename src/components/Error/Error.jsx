import { useSelector } from 'react-redux'
import styles from './Error.module.css'

export function Error() {
  const { errorMessage } = useSelector((store) => store.ingredients);

  return (
    <div className={styles.section}>
      <p className={`text text_type_digits-large ${styles.number_glow} mb-8`}>ERROR</p>
      <p className="text text_type_main-medium mb-15">{errorMessage}</p>
      <p className="text text_type_main-default mt-15 mb-2">сейчас не получится оформить заказ онлайн</p>
      <p className="text text_type_main-default text_color_inactive mb-15">оформите заказ на кассе</p>
    </div>
  )
}
