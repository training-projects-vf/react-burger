import { baseURL, pathAuthUser } from "../../settings/config";
import { TUserRes } from "../../types/types";
import { checkReponse } from "../checkResponse";
import { getCookie } from "../getCookie";
import { TUpdatedUserInfo } from "../../redux/actions/authActions";

export function authUpdateUserInfo(newData: TUpdatedUserInfo) {
  const accessToken = getCookie('accessToken');
  const url = new URL(pathAuthUser, baseURL).toString();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);

  const body = JSON.stringify({
    ...newData,
  })

  const options = {
    method: 'PATCH',
    headers,
    body,
  }

  return fetch(url, options)
    .then((res) => checkReponse<TUserRes>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

}
