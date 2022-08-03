import { ingredientsReducer } from "./ingredientsReducer";
import * as types from '../actions/ingredientsActions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(
      {
        ingredientsRequest: false,
        isSuccess: false,
        ingredientsRequestFailed: false,
        isError: false,
        errorMessage: undefined,
        ingredients: [],
      }
    )
  })
})

it('should handle INGREDIENTS_REQUEST', () => {
  expect(
    ingredientsReducer([], {
      type: types.INGREDIENTS_REQUEST,
    })
  ).toEqual(
    {
      ingredientsRequest: true,
      isError: false,
      errorMessage: undefined,
    }
  )
})

it('should handle INGREDIENTS_REQUEST_SUCCESS', () => {
  expect(
    ingredientsReducer([], {
      type: types.INGREDIENTS_REQUEST_SUCCESS,
    })
  ).toEqual(
    {
      ingredients: undefined,
      isSuccess: true,
      ingredientsRequest: false,
      isError: false,
      errorMessage: undefined,
    }
  )
})

it('should handle INGREDIENTS_REQUEST_FAILED', () => {
  expect(
    ingredientsReducer([], {
      type: types.INGREDIENTS_REQUEST_FAILED,
    })
  ).toEqual(
    {
      ingredientsRequest: false,
      isError: true,
      errorMessage: `Сбой в галактической квантовой сети...\nза что мы платим этим айтишникам... ?`
    }
  )
})
