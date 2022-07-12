import { baseURL, pathAuthLogout } from "../../settings/config";

export function authLogout() {
  const url = new URL(pathAuthLogout, baseURL).toString();
  const headers = new Headers();
  headers.append('Content-type', 'Application/json');

  const refreshToken = localStorage.getItem('refreshToken');
  const body = JSON.stringify({ token: `${refreshToken}` })

  const options = {
    method: 'POST',
    headers,
    body,
  }

  return fetch(url, options)
}
