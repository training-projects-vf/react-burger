import { pathInitPasswordReset, baseURL } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function initPasswordReset(email) {
  const url = new URL(pathInitPasswordReset, baseURL);
  const headers = new Headers();
  headers.append('Content-type', 'Application/json');

  const body = JSON.stringify({
    email,
  })

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
    })
}
