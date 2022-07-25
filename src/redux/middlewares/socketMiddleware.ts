import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from 'redux';
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
      // console.log('action in the middleware', action)
      const { dispatch } = store;
      const { connect, disconnect,
        // wsConnecting,
        wsOpen, wsClose, wsMessage, wsError } = wsActions;

      if (connect.match(action)) {
        const { payload: wssUrl } = action;
        socket = new WebSocket(wssUrl)
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
          dispatch(wsMessage(event.data))
        }

        socket.onerror = event => {
          console.log('onerror', event)
          dispatch(wsError('Websocket error'))
        }

      }
      next(action)
    }
  }

}
