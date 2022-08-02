import { baseURL, pathSubmitNewPassword } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function submitNewPassword(password: string) {
  const url = new URL(pathSubmitNewPassword, baseURL).toString();
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

  type TResponse = {
    success: boolean;
    message: string;
  }

  return fetch(url, options)
    .then((res) => checkReponse<TResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
