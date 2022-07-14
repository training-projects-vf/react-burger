import { pathAuthRegister, baseURL } from "../../settings/config";
import { TUserRes } from "../../types/types";
import { checkReponse } from "../checkResponse";

export function authReg({ name, email, password }: { [property: string]: string }) {
  const url = new URL(pathAuthRegister, baseURL).toString();
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

  type TReg = TUserRes & {
    accessToken: string;
    refreshToken: string;
  }

  return fetch(url, options)
    .then((res) => checkReponse<TReg>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

}
