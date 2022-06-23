import { baseURL, pathAuthToken } from "../settings/config";
import { checkReponse } from "./checkResponse";

export function authRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const url = new URL(pathAuthToken, baseURL);
  const headers = new Headers();
  headers.append('Content-type', 'Application/json');

  const body = {
    token: refreshToken,
  }

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
