import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from 'redux';
import { inspectOrders } from "../../utils/inspectOrders";
import { RootState } from "../store";

export type TwsActionsTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  wsOpen: ActionCreatorWithoutPayload,
  wsClose: ActionCreatorWithoutPayload,
  wsMessage: ActionCreatorWithPayload<any>,
  wsError: ActionCreatorWithPayload<string>
}

export const socketMiddleware = (wsActions: TwsActionsTypes): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null;

    return next => action => {
      const { dispatch } = store;
      const { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } = wsActions;
      let { ingredients } = store.getState().ingredients

      if (connect.match(action)) {
        const { payload: wssUrl } = action;
        //добавлено по причине двойного рендеринга React 18
        //в режиме отладки
        if (socket) { socket.close() }
        socket = new WebSocket(wssUrl)
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen())
        }

        if (disconnect.match(action)) {
          socket.close()
        }

        socket.onclose = () => {
          dispatch(wsClose())
        }

        socket.onmessage = event => {
          let data = JSON.parse(event.data)
          let { orders } = data;
          orders = inspectOrders(orders, ingredients)
          data = {
            ...data,
            orders
          }
          dispatch(wsMessage(data))
        }

        socket.onerror = () => {
          dispatch(wsError('Websocket error'))
        }

      }
      next(action)
    }
  }

}
