import { burgerConstructorReducer } from "./burgerConstructorReducer";
import * as types from '../actions/burgerConstructorActions';
import { constructorInitialState } from './burgerConstructorReducer'

describe('burgerConstructor reducer', () => {

  test('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(constructorInitialState);
  })
})

test('should handle ADD_INGREDIENT', () => {
  const action = {
    type: types.ADD_INGREDIENT,
    payload: {
      type: 'bun'
    }
  }

  expect(burgerConstructorReducer(constructorInitialState, action))
    .toEqual(
      expect.objectContaining(

        {
          ...constructorInitialState,
          ingredientIds: [undefined, undefined],
          bun: [{ undefined }],
          counter: [undefined],
          burgerCost: undefined
        }
      )
    );

})

test('should handle REMOVE_INGREDIENT', () => {
  expect(
    burgerConstructorReducer(constructorInitialState, {
      type: types.REMOVE_INGREDIENT,
      index: Number
    })
  ).toEqual(
    {
      ...constructorInitialState,
      fillings: []
    }
  )
})

test('should handle RESET_BURGER', () => {
  expect(
    burgerConstructorReducer([], {
      type: types.RESET_BURGER
    })
  ).toEqual(constructorInitialState)
})

test('should handle PLACE_ORDER_REQUEST', () => {
  expect(
    burgerConstructorReducer([], {
      type: types.PLACE_ORDER_REQUEST
    })
  ).toEqual(
    {
      orderData: {
        isRequest: true,
      }
    }
  )
})

test('should handle PLACE_ORDER_SUCCESS', () => {
  expect(
    burgerConstructorReducer([], {
      type: types.PLACE_ORDER_SUCCESS
    })
  ).toEqual(
    {
      orderData: {
        isRequest: false,
        error: {
          isError: false
        }
      }
    }
  )
})

test('should handle PLACE_ORDER_FAILED', () => {
  expect(
    burgerConstructorReducer([], {
      type: types.PLACE_ORDER_FAILED
    })
  ).toEqual(
    {
      orderData: {
        isRequest: false,
        error: {
          isError: true,
          errorMessage: 'У нас с сервером что-то плохое случилось...'
        }
      }
    }
  )
})

test('should handle MOVE_FILLINGS', () => {
  expect(
    burgerConstructorReducer(constructorInitialState, {
      type: types.MOVE_FILLINGS,
      payload: {
        dragIndex: undefined,
        hoverIndex: undefined
      }
    })
  ).toEqual(
    {
      ...constructorInitialState,
      fillings: [undefined]
    }
  )
})

test('RESET_ORDER_DATA', () => {
  expect(
    burgerConstructorReducer(constructorInitialState, {
      type: types.RESET_ORDER_DATA
    })
  ).toEqual(
    {
      ...constructorInitialState,
    }
  )
})
