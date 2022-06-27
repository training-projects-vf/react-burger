import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_SUCCESS,
  INGREDIENTS_REQUEST_FAILED,
} from "../actions/ingredientsActions"

const initialState = {
  ingredientsRequest: false,
  isSuccess: false,
  ingredientsRequestFailed: false,
  isError: false,
  errorMessage: null,
  ingredients: [],
}

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredients: action.ingredients,
        isSuccess: true,
        ingredientsRequest: false,
        isError: false,
        errorMessage: null,
      })
    }

    case INGREDIENTS_REQUEST_FAILED: {
      return ({
        ...state,
        ingredientsRequest: false,
        isError: true,
        errorMessage: `Сбой в галактической квантовой сети...\nза что мы платим этим айтишникам... ?`
      })
    }

    default: {
      return state;
    }

  }
}
