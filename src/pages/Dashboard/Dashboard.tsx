/* eslint-disable react-hooks/exhaustive-deps */
import { OrdersFeed } from '../../components/OrdersFeed/OrdersFeed'
import { OrdersPanel } from '../../components/OrdersPanel/OrdersPanel'
import { wssAllOrdersURL } from "../../settings/config";
import { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/store";
import { connect, disconnect } from "../../redux/actions/orderFeedActions";
import styles from './Dashboard.module.css'

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.feed);

  useEffect(() => {

    if (status !== 'ONLINE') {
      dispatch(connect(wssAllOrdersURL))
    }

    return () => {
      dispatch(disconnect())
    }
  }, [])

  return (
    <div className={styles.dashboard}>
      <OrdersFeed />
      <OrdersPanel />
    </div>
  )
}
