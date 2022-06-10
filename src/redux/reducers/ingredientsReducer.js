import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_SUCCESS,
  INGREDIENTS_REQUEST_FAILED,
  SCRUTINIZE_INGREDIENT_REQUEST,
  SCRUTINIZE_INGREDIENT_CLOSE,
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
        ingredientsRequest: false,
        isSuccess: true,
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
        errorMessage: `Сбой в галактической квантовой сети...\nза что мы платим этим айтишникам... ?`
      })
    }

    case SCRUTINIZE_INGREDIENT_REQUEST: {
      return {
        ...state,
        ingredient: action.payload,
        isIngredientPopupOpen: true,
      }
    }

    case SCRUTINIZE_INGREDIENT_CLOSE: {
      return {
        ...state,
        ingredient: {},
        isIngredientPopupOpen: false,
      }
    }


    default: {
      return state;
    }

  }
}
