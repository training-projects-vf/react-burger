import { createAction } from "@reduxjs/toolkit";

// экшн создается ОДНОЙ СТРОКОЙ!
export const connect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction<any, 'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const wsError = createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR');

export const feedActions = {
  connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError,
}

export type TFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
