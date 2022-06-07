import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_SUCCESS,
  INGREDIENTS_REQUEST_FAILED,
} from "../actions/getIngredientsActions"

const initialState = {
  ingredientsRequest: false,
  ingredientsRequestSuccess: false,
  ingredientsRequestFailed: false,
  isError: false,
  errorMessage: null,
  ingredients: [],
}

export const getIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {

    case INGREDIENTS_REQUEST: {
      return ({
        ...state,
        ingredientsRequest: true,
        isError: false,
        errorMessage: null,
      })
    }

    case INGREDIENTS_REQUEST_SUCCESS: {
      return ({
        ...state,
        ingredientsRequest: false,
        ingredientsRequestSuccess: true,
        isError: false,
        errorMessage: null,
        ingredients: action.ingredients,
      })
    }

    case INGREDIENTS_REQUEST_FAILED: {
      return ({
        ...state,
        ingredientsRequest: false,
        isError: true,
        errorMessage: `Сбой в галактической квантовой сети...\nПовторите заказ позже.`
      })
    }

    default: {
      return {
        ...state,
      }
    }

  }
}
