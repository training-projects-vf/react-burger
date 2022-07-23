import { createReducer } from "@reduxjs/toolkit"
import {
  // connect,
  // disconnect,
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError
} from '../actions/orderFeedActions'

enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

type TFeedStore = {
  status: WebsocketStatus,
  connectingError: string | null,
  data: any
}

const initFeedState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  connectingError: null,
  data: []
}

export const orderFeedReducer = createReducer(initFeedState, (builder) => {
  builder.addCase(wsConnecting, (state) => {
    state.status = WebsocketStatus.CONNECTING;
  })
  builder.addCase(wsOpen, (state) => {
    state.status = WebsocketStatus.ONLINE;
    state.connectingError = null;
  })
  builder.addCase(wsClose, (state) => {
    state.status = WebsocketStatus.OFFLINE;
  })
  builder.addCase(wsError, (state, action) => {
    state.connectingError = action.payload;
  })
  builder.addCase(wsMessage, (state, action) => {
    state.data = action.payload;
  })

})
