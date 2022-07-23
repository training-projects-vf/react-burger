import { RootReducer } from "./reducers/rootReducer";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from '../redux/actions/authActions';
import { TBurgerConstructorActions } from '../redux/actions/burgerConstructorActions';
import { TIngredientsActions } from '../redux/actions/ingredientsActions';
import { configureStore } from "@reduxjs/toolkit";
import type { } from "redux-thunk/extend-redux"
import { TFeedActions } from "./actions/orderFeedActions";

export const store = configureStore({
  reducer: RootReducer
})

export type RootState = ReturnType<typeof RootReducer>;
export type TAppActions = TAuthActions | TBurgerConstructorActions | TIngredientsActions | TFeedActions;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions>
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type AppDispath<ReturnType = void> = (action: TAppActions | AppThunk<ReturnType>) => ReturnType;
export const useDispatch: () => AppDispath = dispatchHook;
