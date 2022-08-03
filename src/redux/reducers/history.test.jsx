import { historyReducer, ERequestStatus } from "./historyReducer";
import * as types from '../actions/historyActions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(historyReducer(undefined, {})).toEqual(
      {
        requestStatus: ERequestStatus.IDLE,
        order: {
          _id: '',
          ingredients: [],
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          owner: '',
          __v: 0
        }
      }
    )
  })
})

it('should handle REG_REQUEST_SUBMIT', () => {
  expect(
    historyReducer([], {
      type: types.HISTORY_REQUEST,
    })
  ).toEqual(
    {
      requestStatus: ERequestStatus.PENDING,
    }
  )
})

it('should handle HISTORY_REQUEST_SUCCESS', () => {
  expect(
    historyReducer([], {
      type: types.HISTORY_REQUEST_SUCCESS,
    })
  ).toEqual(
    {
      requestStatus: ERequestStatus.SUCCEEDED,
      order: {}
    }
  )
})

it('should handle HISTORY_REQUEST_ERROR', () => {
  expect(
    historyReducer([], {
      type: types.HISTORY_REQUEST_ERROR,
    })
  ).toEqual(
    {
      requestStatus: ERequestStatus.FAILED,
    }
  )
})
