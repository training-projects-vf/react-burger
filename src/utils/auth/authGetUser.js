import { pathAuthUser, baseURL } from "../../settings/config";
import { getCookie } from "../getCookie";
import { checkReponse } from "../checkResponse";

export function authGetUser() {
  const accessToken = getCookie('accessToken');
  const url = new URL(pathAuthUser, baseURL);
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);

  const options = {
    method: 'GET',
    headers,
  }

  return fetch(url, options)
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
