import { config } from '../settings/config.js';

export default function getData() {
  const url = new URL(config.dataURL);

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`${res.status}: ${res.statusText}`)
    })
    .catch((err) => Promise.reject(err))

}
