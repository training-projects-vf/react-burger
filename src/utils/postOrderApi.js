import { config } from "../settings/config";

export function postOrderApi(ingredientIds) {
  const { orderURL } = config;
  const url = new URL(orderURL);
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`${res.status}: ${res.statusText}`)
    })
}
