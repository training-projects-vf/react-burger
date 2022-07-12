import { baseURL, pathAuthToken } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function authRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const url = new URL(pathAuthToken, baseURL).toString();
  const headers = new Headers();
  headers.append('Content-type', 'Application/json');

  const body = JSON.stringify({
    token: refreshToken,
  })

  const options = {
    method: 'POST',
    headers,
    body,
  }

  type TRefreshTokenRes = {
    success: boolean;
    accessToken: string;
  }

  return fetch(url, options)
    .then((res) => checkReponse<TRefreshTokenRes>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

}
