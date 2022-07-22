import { TIngredient } from "../../types/types"
import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_SUCCESS,
  INGREDIENTS_REQUEST_FAILED,
  TIngredientsActions,
} from "../actions/ingredientsActions"

type TIngredientsState = {
  ingredientsRequest: boolean,
  isSuccess: boolean,
  ingredientsRequestFailed: boolean,
  isError: boolean,
  errorMessage?: string,
  ingredients: TIngredient[],
}

const initialState: TIngredientsState = {
  ingredientsRequest: false,
  isSuccess: false,
  ingredientsRequestFailed: false,
  isError: false,
  errorMessage: undefined,
  ingredients: [],
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {

    case INGREDIENTS_REQUEST: {
      return ({
        ...state,
        ingredientsRequest: true,
        isError: false,
        errorMessage: undefined,
      })
    }

    case INGREDIENTS_REQUEST_SUCCESS: {
      return ({
        ...state,
        ingredients: action.ingredients,
        isSuccess: true,
        ingredientsRequest: false,
        isError: false,
        errorMessage: undefined,
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
