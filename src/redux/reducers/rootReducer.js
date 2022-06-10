import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredientsReducer';
import { burgerConstructorReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerConstructorReducer
})
