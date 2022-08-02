import { useSelector } from '../../redux/store'
import styles from './OrdersPanel.module.css'

export const OrdersPanel = () => {
  const { orders, total, totalToday } = useSelector((store) => store.feed.data);

  if (!orders) return null;

  return (
    <section className={styles.panel}>
      <section className={styles.subpanels}>

        <div className={styles.subpanel}>
          <span className="text text_type_main-medium mb-5">Готовы:</span>
          <div className={styles.numbers_panel}>
            {
              orders.map((order) => {
                if (order.status === 'done') {
                  return (
                    <span
                      key={order.number}
                      className={`text text_type_digits-default ${styles.text_order_done}`}
                    >
                      {order.number}
                    </span>
                  )
                }
                return null;
              })
            }
          </div>

        </div>
        <div className={styles.subpanel}>
          <span className="text text_type_main-medium mb-5">В работе:</span>
          {
            orders.map((order) => {
              if (order.status !== 'done') {
                return (
                  <span
                    key={order.number}
                    className="text text_type_digits-default"
                  >
                    {order.number}
                  </span>
                )
              }
              return null;
            })
          }
        </div>
      </section>
      <span className="text text_type_main-medium mt-15">Выполнено за все время:</span>
      <span className={`text text_type_digits-large ${styles.digit_shadow}`}>{total}</span>
      <span className="text text_type_main-medium mt-15">Выполнено за сегодня:</span>
      <span className={`text text_type_digits-large ${styles.digit_shadow}`}>{totalToday}</span>

    </section>

  )
}
