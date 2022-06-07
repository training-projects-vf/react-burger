import { config } from '../settings/config.js';

export function getIngredientsApi() {
  const url = new URL(config.ingredientsURL);

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`${res.status}: ${res.statusText}`)
    });
}
