import { TOrder } from "../../types/types";
import { getOrder } from "../../utils/getOrder";
import { AppDispath } from "../store";

export const HISTORY_REQUEST = 'HISTORY_REQUEST';
export const HISTORY_REQUEST_SUCCESS = 'HISTORY_REQUEST_SUCCESS';
export const HISTORY_REQUEST_ERROR = 'HISTORY_REQUEST_ERROR';

export interface IRequestHistoryAction {
  readonly type: typeof HISTORY_REQUEST;
}

export interface ISuccessHistoryAction {
  readonly type: typeof HISTORY_REQUEST_SUCCESS;
  readonly payload: TOrder;
}

export interface IErrorHistoryAction {
  readonly type: typeof HISTORY_REQUEST_ERROR;
}

export type THistoryActions =
  IRequestHistoryAction
  | ISuccessHistoryAction
  | IErrorHistoryAction

export function getOrderById(id: string) {
  return function (dispatch: AppDispath) {
    dispatch({ type: HISTORY_REQUEST })

    getOrder(id)
      .then((data) => {
        dispatch({
          type: HISTORY_REQUEST_SUCCESS,
          payload: data.orders[0]
        })
      })
      .catch(() => {
        dispatch({ type: HISTORY_REQUEST_ERROR })
      })
  }
}
