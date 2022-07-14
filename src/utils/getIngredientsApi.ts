import { baseURL, pathIngredients } from '../settings/config';
import { TIngredient } from '../types/types';
import { checkReponse } from './checkResponse';

export function getIngredientsApi() {
  const url = new URL(pathIngredients, baseURL).toString();

  type TIngredientsRes = {
    success: boolean;
    data: TIngredient[];
  }

  return fetch(url)
    .then((res) => checkReponse<TIngredientsRes>(res))
    .then((data) => {
      if (data.success) return data;
      return Promise.reject(data);
    });
}
