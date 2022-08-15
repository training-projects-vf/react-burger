import { v4 as uuidv4 } from 'uuid';
import { postOrderApi } from '../../utils/postOrderApi';
import { TIngredient, TShortIngredient } from '../../types/types';
import { AppDispath } from '../store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const RESET_BURGER = 'RESET_BURGER';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const RESET_ORDER_DATA = 'RESET_ORDER_DATA';
export const MOVE_FILLINGS = 'MOVE_CARDS';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TShortIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT,
  readonly index: number;
}

export interface IResetBurgerAction {
  readonly type: typeof RESET_BURGER;
}

export interface IPlaceOrderRequestAction {
  readonly type: typeof PLACE_ORDER_REQUEST;
}

export interface IPlaceOrderSuccessAction {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly payload: any;
}

export interface IPlaceOrderFailAction {
  readonly type: typeof PLACE_ORDER_FAILED;
}

export interface IResetOrderDataAction {
  readonly type: typeof RESET_ORDER_DATA;
}

export interface IMoveFillingAction {
  readonly type: typeof MOVE_FILLINGS;
  readonly payload: any;
}

export type TBurgerConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IResetBurgerAction
  | IPlaceOrderRequestAction
  | IPlaceOrderSuccessAction
  | IPlaceOrderFailAction
  | IResetOrderDataAction
  | IMoveFillingAction;

export function addIngredient(ingredient: TIngredient): IAddIngredientAction {
  const { _id, type, name, price, image } = ingredient;
  const uuid = uuidv4();
  const payload = { uuid, _id, type, name, price, image }

  return ({ type: ADD_INGREDIENT, payload })
}

export function removeIngredient(index: number): IRemoveIngredientAction {
  return ({ type: REMOVE_INGREDIENT, index: index })
}

export function placeOrder(ingredientIds: Array<string>) {
  return function (dispatch: AppDispath) {
    dispatch({ type: PLACE_ORDER_REQUEST })
    postOrderApi(ingredientIds)
      .then((data) => {
        dispatch({ type: RESET_ORDER_DATA })
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
      })
      .catch(() => dispatch({ type: PLACE_ORDER_FAILED }));
  }
}
