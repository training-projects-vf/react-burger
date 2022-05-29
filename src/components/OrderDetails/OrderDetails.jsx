import { orderDetailsType } from "../../utils/propTypes";
import styles from './OrderDetails.module.css'
import accepted from '../../images/accepted.gif'

export function OrderDetails() {

  return (
    <div className={styles.section}>
      <p className={`text text_type_digits-large ${styles.number_glow} mb-8`}>034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div>
        <img src={accepted} alt="order accepted" className={styles.icon_accepted} />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">дождитесь готовности на орбитальной станции</p>
    </div>
  )

}
