import { pathInitPasswordReset, baseURL } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function initPasswordReset(email: string) {
  const url = new URL(pathInitPasswordReset, baseURL).toString();
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

  type TPasswordResetRes = {
    success: boolean;
    message: string;
  }

  return fetch(url, options)
    .then((res) => checkReponse<TPasswordResetRes>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
}
