import { createReducer } from "@reduxjs/toolkit"
import { TOrder } from "../../types/types"
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
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

type TFeedStore = {
  status: WebsocketStatus,
  disconnectRequested: boolean,
  connectingError: string | null,
  data: {
    success: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number
  }
}

const initFeedState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  disconnectRequested: false,
  connectingError: null,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  }
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
    .addCase(wsMessage, (state, action) => {
      state.data = JSON.parse(action.payload);
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(disconnect, (state) => {
      state.disconnectRequested = true;
    })
})
