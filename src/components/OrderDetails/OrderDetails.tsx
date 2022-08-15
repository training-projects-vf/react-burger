import styles from './OrderDetails.module.css'
import accepted from '../../images/accepted.gif'
import { useSelector } from '../../redux/store'

export function OrderDetails() {
  const { number } = useSelector((store) => store.burger.orderData.order);
  const { success: isOrderAccepted } = useSelector((store) => store.burger.orderData);

  return (
    <>
      {isOrderAccepted &&
        <div className={styles.section} data-cy='orderDetails'>
          <p className={`text text_type_digits-large ${styles.number_glow} mb-8`}>{number}</p>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <div>
            <img src={accepted} alt="order accepted" className={styles.icon_accepted} />
          </div>
          <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mb-15">дождитесь готовности на орбитальной станции</p>
        </div>
      }
    </>
  )

}
