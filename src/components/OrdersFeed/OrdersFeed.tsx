/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "../../redux/store";
import { wssAllOrdersURL } from "../../settings/config";
import { useEffect } from "react";
import { connect, disconnect } from "../../redux/actions/orderFeedActions";

export const OrdersFeed = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.feed);
  let { orders } = useSelector((store) => store.feed.data)

  useEffect(() => {
    if (status === 'OFFLINE') {
      dispatch(connect(wssAllOrdersURL))
    }

    return () => {
      dispatch(disconnect())
    }
  }, [])

if (!orders) {return null}

  return (
    <>
      {
        orders.map((order: any) => {
          return (
            <p key={order._id}>{order.name}</p>
          )
        })
      }
    </>
)
}
