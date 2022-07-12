import { pathAuthLogin, baseURL } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function authLogin({ email, password }: { email: string; password: string; }) {
  const url = new URL(pathAuthLogin, baseURL).toString();
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const body = JSON.stringify({
    email,
    password,
  })

  const options = {
    method: 'POST',
    headers,
    body,
  }

    type TLoginRes = {
      success: Boolean;
      accessToken: string;
  }

  return fetch(url, options)
    .then((res) => checkReponse<TLoginRes>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

}
