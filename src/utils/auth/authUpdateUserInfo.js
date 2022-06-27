import { baseURL, pathAuthUser } from "../../settings/config";
import { checkReponse } from "../checkResponse";
import { getCookie } from "../getCookie";

export function authUpdateUserInfo(newData) {
  console.log('newData', newData)
  const accessToken = getCookie('accessToken');
  const url = new URL(pathAuthUser, baseURL)
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = JSON.stringify({
    // authorization: accessToken,
    ...newData,
  })

  const options = {
    method: 'PATCH',
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
