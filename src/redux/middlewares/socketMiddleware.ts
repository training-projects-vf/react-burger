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
      const { dispatch, getState } = store;
      const { type } = action;
      const { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } = wsActions;

      if (connect.match(action)) {
        const { payload } = action;
        socket = new WebSocket(payload)
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsOpen })
        }

        socket.onmessage = event => {
          dispatch({ type: wsMessage, payload: event })
        }

        socket.onclose = () => {
          dispatch({ type: wsClose })
        }
      }
    }
  }

}
