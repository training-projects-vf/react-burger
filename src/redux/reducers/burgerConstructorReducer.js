/* eslint-disable default-case */
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  RESET_ORDER_DATA,
} from '../actions/burgerConstructorActions';

const initialState = {
  bun: [],
  fillings: [],
  burgerCost: 0,
  counter: [],
  orderData: {
    success: null,
    order: {
      number: null,
    }
  }
};

export const burgerConstructorReducer = (state = initialState, action) => {

  const countIngredients = () => {
    const { ingredientIds } = state;
    const uniqueIds = Array.from(new Set(ingredientIds));
    const ingredientsCounter = uniqueIds.map((uniqueId) => {
      const qty = ingredientIds.reduce((previousQty, ingredientId) => {
        if (uniqueId === ingredientId) {
          return previousQty + 1
        }
        return previousQty
      }, 0)

      return {
        _id: uniqueId,
        qty,
      }
    })

    return ingredientsCounter;
  }

  const updateIdsList = () => {
    const allIngredients = state.fillings.concat(state.bun, state.bun)
    const idList = allIngredients.map((ingredient) => ingredient._id)
    return idList;
  }

  const calcBurger = () => {
    const bunPrice = state.bun.reduce((price, item) => {
      return price + item.price
    }, 0)

    const fillingsPrice = state.fillings.reduce((price, item) => {
      return price + item.price
    }, 0)

    const burgerCost = bunPrice * 2 + fillingsPrice;
    return burgerCost;
  }

  switch (action.type) {
    case ADD_INGREDIENT: {
      const { type } = action.payload;
      if (type === 'bun') {
        state = {
          ...state,
          bun: [action.payload],
        }
      } else {
        state = {
          ...state,
          fillings: [action.payload, ...state.fillings]
        }
      }

      const ingredientIds = updateIdsList();
      state = { ...state, ingredientIds };

      const counter = countIngredients();
      const burgerCost = calcBurger();

      return {
        ...state,
        counter,
        burgerCost,
      }

    }

    case REMOVE_INGREDIENT: {
      const updatedFillings = [...state.fillings];
      updatedFillings.splice(action.index, 1)

      state = {
        ...state,
        fillings: [...updatedFillings],
      }

      const ingredientIds = updateIdsList();
      state = { ...state, ingredientIds };
      const counter = countIngredients();
      const burgerCost = calcBurger();

      return {
        ...state,
        counter,
        burgerCost
      }
    }

    case RESET_ORDER_DATA: {
      return {
        ...state,
        orderData: {
          success: null,
        }
      }
    }

    case PLACE_ORDER_SUCCESS: {
      console.log('success', action.payload);
      return {
        ...state,
        orderData: {
          ...action.payload,
        }
      }
    }

    case PLACE_ORDER_FAILED: {
      console.log('failed')
      return {
        ...state,
        orderData: {
          isError: true,
        }
      }
    }

    default: {
      return state;
    }

  }
}
