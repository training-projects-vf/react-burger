import { useSelector } from "../../redux/store";
import { OrderCard } from "../OrderCard/OrderCard";
import { Link, useLocation } from "react-router-dom";
import styles from './OrdersFeed.module.css'

export const OrdersFeed = () => {
  const { orders } = useSelector((store) => store.feed.data)
  const location = useLocation()

  if (!orders) { return null }

  return (
    <section className={styles.feed}>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={`custom-scroll ${styles.orders}`}>
        {
          orders.map((order) => {
            const { _id, number, name, ingredients, createdAt } = order
            return (
              <Link
                key={_id}
                to={`/feed/${number}`}
                style={{ textDecoration: 'none', color: 'white' }}
                state={{ backgroundLocation: location }}
              >
                <OrderCard
                  number={number}
                  name={name}
                  components={ingredients}
                  createdAt={createdAt}
                />
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}
