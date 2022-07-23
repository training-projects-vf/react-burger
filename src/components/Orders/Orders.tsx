import { useDispatch, useSelector } from '../../redux/store'
import { wssAllOrdersURL } from '../../settings/config';
import styles from './Orders.module.css'

export function Orders() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.feed);

  if (status === 'OFFLINE') {
    dispatch({ type: 'FEED_CONNECT', payload: wssAllOrdersURL })
  }

  return (
    <h1>Orders</h1>
  )
}
