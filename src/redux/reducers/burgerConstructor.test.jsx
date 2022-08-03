import { burgerConstructorReducer } from "./burgerConstructorReducer";
import * as types from '../actions/burgerConstructorActions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(
      {
        bun: [],
        fillings: [],
        burgerCost: 0,
        counter: [],
        ingredientIds: [],
        orderData: {
          isRequest: false,
          success: false,
          error: {
            isError: false,
          },
          order: {
            number: null,
          },
        }
      }
    )
  })
})

it('should handle ADD_INGREDIENT', () => {
  expect(
    burgerConstructorReducer([], {
      type: types.ADD_INGREDIENT,
      payload: {}
    })
  ).toEqual(
    {
      bun: []
    }
    ||
    {
      fillings: []
    }
  )
})
