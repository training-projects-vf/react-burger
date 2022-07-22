import { getIngredientsApi } from "../../utils/getIngredientsApi";
import { TIngredient } from "../../types/types";
import { AppDispath } from "../store";

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_REQUEST_SUCCESS: 'INGREDIENTS_REQUEST_SUCCESS' = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUEST_FAILED: 'INGREDIENTS_REQUEST_FAILED' = 'INGREDIENTS_REQUEST_FAILED';

export interface IIngredientRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientRequesSuccessAction {
  readonly type: typeof INGREDIENTS_REQUEST_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}

export interface IIngredientRequestFailedAction {
  readonly type: typeof INGREDIENTS_REQUEST_FAILED;
}

export type TIngredientsActions =
  | IIngredientRequestAction
  | IIngredientRequesSuccessAction
  | IIngredientRequestFailedAction;

export function getIngredients() {
  return function (dispatch: AppDispath) {
    dispatch({ type: INGREDIENTS_REQUEST })

    getIngredientsApi()
      .then((data) => {
        dispatch({
          type: INGREDIENTS_REQUEST_SUCCESS,
          ingredients: data.data,
        });
      })
      .catch(() => {
        dispatch({ type: INGREDIENTS_REQUEST_FAILED })
      });
  }
};
