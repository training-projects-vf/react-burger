import { getIngredientsApi } from "../../utils/getIngredientsApi";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUEST_FAILED = 'INGREDIENTS_REQUEST_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: INGREDIENTS_REQUEST })

    getIngredientsApi()
      .then((data) => {
        dispatch({
          type: INGREDIENTS_REQUEST_SUCCESS,
          ingredients: data.data,
        });
      })
      .catch(() => {
        console.log('catch')
        dispatch({ type: INGREDIENTS_REQUEST_FAILED })
      });
  }
};
