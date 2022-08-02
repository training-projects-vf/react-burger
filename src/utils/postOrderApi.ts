import { baseURL, pathOrders } from "../settings/config";
import { TOrdersRes } from "../types/types";
import { checkReponse } from "./checkResponse";
import { getCookie } from "./getCookie";

export function postOrderApi(ingredientsIds: string[]) {
  const url: string = new URL(pathOrders, baseURL).toString();
  const token = getCookie('accessToken');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`)

  const body = JSON.stringify({
    ingredients: ingredientsIds
  });

  const options = {
    method: 'POST',
    headers,
    body,
  }

  return fetch(url, options)
    .then((data) => checkReponse<TOrdersRes>(data))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
