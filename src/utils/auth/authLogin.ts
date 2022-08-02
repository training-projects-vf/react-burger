import { pathAuthLogin, baseURL } from "../../settings/config";
import { checkReponse } from "../checkResponse";
import { TLoginResponse } from "../../redux/actions/authActions";

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

  return fetch(url, options)
    .then((res) => checkReponse<TLoginResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
