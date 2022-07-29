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
      const { dispatch } = store;
      const { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } = wsActions;

      if (connect.match(action)) {
        const { payload: wssUrl } = action;
        //добавлено по причине двойного рендеринга React 18
        //в режиме отладки
        if (socket) { socket.close() }
        socket = new WebSocket(wssUrl)
        dispatch(wsConnecting())
      }

      if (socket) {
        // console.log('socket', socket)

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
          dispatch(wsError('Websocket error'))
        }

      }
      next(action)
    }
  }

}
