/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect, disconnect } from '../../redux/actions/orderFeedActions';
import { useDispatch, useSelector } from '../../redux/store'
import { wssUserOrdersURL } from '../../settings/config';
import styles from './UserOrders.module.css'
import { getCookie } from '../../utils/getCookie';
import { Preloader } from '../Preloader/Preloader';
import { OrderCard } from '../OrderCard/OrderCard';
import { Link, useLocation } from 'react-router-dom';

export function UserOrders() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.feed);
  const accessToken = getCookie('accessToken');
  let { orders } = useSelector((store) => store.feed.data)
  const location = useLocation();

  useEffect(() => {
    if (status === 'OFFLINE') {
      dispatch(connect(`${wssUserOrdersURL}?token=${accessToken}`))
    }

    return () => {
      dispatch(disconnect())
    }
  }, [])


  if (status !== 'ONLINE' || !orders) {
    return (
      <div className={styles.preloader_div}>
        <Preloader
          message=''
        />
      </div>
    )
  }

  const reversedOrders = [...orders].reverse();

  return (
    <section className={`custom-scroll ${styles.userOrdersFeed_section}`}>
      {
        reversedOrders.map((order) => {
          const { _id, number, name, ingredients, createdAt } = order
          return (
            <Link
              key={_id}
              to={`/profile/orders/${number}`}
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
    </section>
  )
}
