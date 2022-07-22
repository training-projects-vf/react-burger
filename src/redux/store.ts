import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  // useDispatch as dispatchHook,
} from 'react-redux';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from '../redux/actions/authActions';
import { TBurgerConstructorActions } from '../redux/actions/burgerConstructorActions';
import { TIngredientsActions } from '../redux/actions/ingredientsActions';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type TAppActions = TAuthActions | TBurgerConstructorActions | TIngredientsActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type AppDispath = typeof store.dispatch;
// export const useDispatch = () => dispatchHook<AppDispath | AppThunk>();
