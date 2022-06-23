import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredientsReducer';
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerConstructorReducer,
  auth: authReducer,
})
