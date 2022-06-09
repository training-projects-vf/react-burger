import { baseURL, pathOrder } from "../settings/config";
import { checkReponse } from "./checkResponse";

export function postOrderApi(ingredientIds) {
  const url = new URL(pathOrder, baseURL);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    ingredients: ingredientIds
  });

  const options = {
    method: 'POST',
    headers,
    body,
  }

  return fetch(url, options)
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
