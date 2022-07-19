import { store } from '../redux/store'
import { TAuthActions } from '../redux/actions/authActions';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
export type TAppActions = TAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispath = typeof store.dispatch;

export type TCategory = {
  categoryMarker: "bun" | "sauce" | "main";
  ruCategoryName: "Булки" | "Соусы" | "Начинки";
}

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: "bun" | "main" | "sauce";
  readonly __v: number;
  readonly _id: string;
}

export type TFilling = Omit<TIngredient, "calories" | "carbohydrates" | "fat" | "image_large" | "image_mobile"
  | "proteins" | "_v"> & { uuid: string }

export type TUser = {
  email: string;
  name: string;
}

export type TUserRes = {
  success: boolean;
  user: TUser;
}
