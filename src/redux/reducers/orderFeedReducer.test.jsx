import { orderFeedReducer } from "./orderFeedReducer";
import * as types from '../actions/orderFeedActions';
import { initFeedState } from "./orderFeedReducer";

describe('order feed reducer', () => {

  test('should return the initial state', () => {
    expect(
      orderFeedReducer(initFeedState, {
        type: 'FEED_DISCONNECT'
      }

      )
    )
      .toEqual(
        {
          ...initFeedState,
          disconnectRequested: true
        }
      )
  })

})
