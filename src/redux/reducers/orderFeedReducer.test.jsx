import { orderFeedReducer } from "./orderFeedReducer";
import * as types from '../actions/orderFeedActions';
import { initFeedState, EWebsocketStatus } from "./orderFeedReducer";
import { json } from "stream/consumers";

describe('order feed reducer', () => {

  test('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual(initFeedState)
  })

  test('should handle FEED_WS_CONNECTING', () => {
    expect(
      orderFeedReducer(initFeedState, types.wsConnecting())
    ).toEqual(
      {
        ...initFeedState,
        status: EWebsocketStatus.CONNECTING
      }
    )
  })

  test('should handle FEED_WS_OPEN', () => {
    expect(orderFeedReducer(initFeedState, types.wsOpen()))
      .toEqual(
        {
          ...initFeedState,
          status: EWebsocketStatus.ONLINE,
          connectingError: null,
          disconnectRequested: false,
        }
      )
  })

  test('should handle FEED_WS_CLOSE', () => {
    expect(orderFeedReducer(initFeedState, types.wsClose()))
      .toEqual(
        {
          ...initFeedState,
          status: EWebsocketStatus.OFFLINE
        }
      )
  })

  test('should handle FEED_WS_MESSAGE', () => {
    expect(orderFeedReducer(initFeedState, types.wsMessage(JSON.stringify('data in the message'))))
      .toEqual(
        {
          ...initFeedState,
          data: JSON.parse(JSON.stringify('data in the message')),
        }
      )
  })

  test('should handle FEED_WS_ERROR', () => {
    expect(orderFeedReducer(initFeedState, types.wsError('error message')))
      .toEqual(
        {
          ...initFeedState,
          connectingError: 'error message'
        }
      )
  })

  test('should handle FEED_DISCONNECT', () => {
    expect(
      orderFeedReducer(initFeedState, types.disconnect())
    ).toEqual(
      {
        ...initFeedState,
        disconnectRequested: true
      }
    )
  })

})
