import { cookieMaxAgeDays } from "../../settings/config";

export function authSetTokens(res) {
  let { accessToken, refreshToken } = res;
  accessToken = accessToken.split('Bearer ')[1];
  const expires = cookieMaxAgeDays * 24 * 60 * 60;
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${expires}`;
  localStorage.setItem('refreshToken', refreshToken);
}
