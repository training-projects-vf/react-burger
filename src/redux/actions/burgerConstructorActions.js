import { v4 as uuidv4 } from 'uuid';
import { postOrderApi } from '../../utils/postOrderApi';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const RESET_ORDER_DATA = 'RESET_ORDER_DATA';

export function addIngredient(ingredient) {
  const { _id, type, name, price, image } = ingredient;
  const uuid = uuidv4();
  const payload = { uuid, _id, type, name, price, image }

  return function (dispatch) {
    dispatch({ type: ADD_INGREDIENT, payload })
  }
}

export function removeIngredient(index) {
  return function (dispatch) {
    dispatch({ type: REMOVE_INGREDIENT, index })
  }
}

export function placeOrder(ingredientIds) {
  return function (dispatch) {
    dispatch({ type: RESET_ORDER_DATA })
    postOrderApi(ingredientIds)
      .then((data) => {
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
      })
      .catch(() => dispatch({ type: PLACE_ORDER_FAILED }));
  }
}
