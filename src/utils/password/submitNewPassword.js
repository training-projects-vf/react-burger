import { baseURL, pathSubmitNewPassword } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function submitNewPassword(password) {
  const url = new URL(pathSubmitNewPassword, baseURL);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const token = localStorage.getItem('refreshToken');

  const body = JSON.stringify({
    password,
    token,
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
    });
}
