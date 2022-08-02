// import { createReducer } from '@reduxjs/toolkit'
import { TOrder } from '../../types/types'
import {
  HISTORY_REQUEST,
  HISTORY_REQUEST_SUCCESS,
  HISTORY_REQUEST_ERROR
} from '../actions/historyActions'
import { THistoryActions } from '../actions/historyActions'

export enum ERequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

type THistoryStore = {
  requestStatus: ERequestStatus,
  order: TOrder
}

const initState: THistoryStore = {
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

export const historyReducer = (state = initState, action: THistoryActions): THistoryStore => {
  switch (action.type) {

    case HISTORY_REQUEST: {
      return {
        ...state,
        requestStatus: ERequestStatus.PENDING
      }
    }

    case HISTORY_REQUEST_SUCCESS: {
      return {
        ...state,
        requestStatus: ERequestStatus.SUCCEEDED,
        order: {
          ...action.payload,
        }
      }
    }

    case HISTORY_REQUEST_ERROR: {
      return {
        ...state,
        requestStatus: ERequestStatus.FAILED
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

// export const historyReducer = createReducer(initState, (builder) => {
//   builder
//     .addCase(REQUEST_ORDER, (state) => {
//       state.requestStatus = RequestStatus.PENDING;
//     })
//     .addCase(REQUEST_SUCCESS, (state, action) => {
//       state.requestStatus = RequestStatus.SUCCEEDED;
//       state.order = action;
//     })
//     .addCase(REQUEST_ERROR, (state) => {
//       state.requestStatus = RequestStatus.FAILED;
//     })
// })
