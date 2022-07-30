/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect, disconnect } from '../../redux/actions/orderFeedActions';
import { useDispatch, useSelector } from '../../redux/store'
import { wssAllOrdersURL } from '../../settings/config';
import styles from './UserOrders.module.css'

export function Orders() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.feed);

  useEffect(() => {
    if (status === 'OFFLINE') {
      dispatch(connect(wssAllOrdersURL))
    }

    return () => {
      dispatch(disconnect())
    }
  }, [])


  return (
    <div className={styles.ordersFeed}>
      <h1>Orders</h1>
    </div>
  )
}
