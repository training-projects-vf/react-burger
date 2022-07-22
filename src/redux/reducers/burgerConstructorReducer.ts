/* eslint-disable default-case */
import { TShortIngredient } from '../../types/types';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_BURGER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  RESET_ORDER_DATA,
  MOVE_FILLINGS,
  PLACE_ORDER_REQUEST,
} from '../actions/burgerConstructorActions';
import { TBurgerConstructorActions } from '../actions/burgerConstructorActions';

type TCounter = {
  _id: string;
  qty: number;
}

type TBurgerState = {
  bun: TShortIngredient[],
  fillings: TShortIngredient[],
  burgerCost: number,
  counter: TCounter[],
  ingredientIds: string[],
  orderData: {
    isRequest: boolean,
    success: boolean,
    error: {
      isError: boolean,
      errorMessage?: string,
    },
    order: {
      number: number | null,
    }
  }
}

const initialState: TBurgerState = {
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
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerState => {

  const countIngredients = () => {
    const { ingredientIds } = state;
    const uniqueIds = Array.from(new Set(ingredientIds));
    const ingredientsCounter = uniqueIds.map((uniqueId) => {
      const qty = ingredientIds.reduce((previousQty: number, ingredientId: string) => {
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

    case RESET_BURGER: {
      return {
        ...initialState,
      }
    }

    case RESET_ORDER_DATA: {
      return {
        ...state,
        orderData: {
          ...state.orderData,
          success: false,
          error: {
            isError: false,
          }
        }
      }
    }

    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        orderData: {
          ...state.orderData,
          isRequest: true,
        }
      }
    }

    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        orderData: {
          ...action.payload,
          isRequest: false,
          error: {
            isError: false,
          }
        }
      }
    }

    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        orderData: {
          ...state.orderData,
          isRequest: false,
          error: {
            isError: true,
            errorMessage: 'У нас с сервером что-то плохое случилось...'
          }
        }
      }
    }

    case MOVE_FILLINGS: {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedFilling = state.fillings[dragIndex]
      const newFillings = [...state.fillings]

      newFillings.splice(dragIndex, 1);
      newFillings.splice(hoverIndex, 0, draggedFilling);

      return {
        ...state,
        fillings: newFillings,
      }
    }

    default: {
      return state;
    }

  }
}
