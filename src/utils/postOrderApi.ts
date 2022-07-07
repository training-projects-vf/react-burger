import { baseURL, pathOrder } from "../settings/config";
import { checkReponse } from "./checkResponse";

export function postOrderApi(ingredientIds: Array<string>) {
  const url: string = new URL(pathOrder, baseURL).toString();
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
    .then((data: any) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
