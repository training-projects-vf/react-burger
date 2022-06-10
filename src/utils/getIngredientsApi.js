import { baseURL, pathIngredients } from '../settings/config.js';
import { checkReponse } from './checkResponse.js';

export function getIngredientsApi() {
  const url = new URL(pathIngredients, baseURL);

  return fetch(url)
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
