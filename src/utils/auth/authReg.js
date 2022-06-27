import { pathAuthRegister, baseURL } from "../../settings/config";
import { checkReponse } from "../checkResponse";

export function authReg({ name, email, password }) {
  const url = new URL(pathAuthRegister, baseURL);
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const body = JSON.stringify({
    name,
    email,
    password,
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
