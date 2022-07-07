import { baseURL, pathIngredients } from '../settings/config.js';
import { checkReponse } from './checkResponse';
// import { TIngredient } from '../types/ingredient.js';

export function getIngredientsApi() {
  const url: string = new URL(pathIngredients, baseURL).toString();

// type TData = {
//   success: boolean;
//   data: Array<TIngredient>;
// }

  return fetch(url)
    .then(checkReponse)
    .then((data: any) => {
      console.log(data);
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
