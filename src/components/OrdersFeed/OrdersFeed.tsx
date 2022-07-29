import { useSelector } from "../../redux/store";
import { OrderCard } from "../OrderCard/OrderCard";
import styles from './OrdersFeed.module.css'

export const OrdersFeed = () => {
  let { orders } = useSelector((store) => store.feed.data)

  if (!orders) { return null }

  return (
    <section className={styles.feed}>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={`custom-scroll ${styles.orders}`}>
        {
          orders.map((order) => {
            const { _id, number, name, ingredients, createdAt } = order
            return (
              <OrderCard
                key={_id}
                number={number}
                name={name}
                components={ingredients}
                createdAt={createdAt}
              />
            )
          })
        }
      </div>
    </section>
  )
}
