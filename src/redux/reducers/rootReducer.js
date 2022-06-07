import { combineReducers } from "redux";
import { getIngredientsReducer } from './getIngredientsReducer';
import { burgerConstructorReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  burger: burgerConstructorReducer
})
