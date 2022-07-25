import { createReducer } from "@reduxjs/toolkit"
import {
  // connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError,
} from '../actions/orderFeedActions'

enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

type TFeedStore = {
  status: WebsocketStatus,
  disconnectRequested: boolean,
  connectingError: string | null,
  data: any
}

const initFeedState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  disconnectRequested: false,
  connectingError: null,
  data: []
}

export const orderFeedReducer = createReducer(initFeedState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = null;
      state.disconnectRequested = false;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = JSON.parse(action.payload);
    })
    .addCase(disconnect, (state) => {
      state.disconnectRequested = true;
    })
})
