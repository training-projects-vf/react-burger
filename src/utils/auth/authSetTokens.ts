import { TRegResponse } from "../../redux/actions/authActions";
import { cookieMaxAgeDays } from "../../settings/config";

export function authSetTokens(tokens: Omit<TRegResponse, "user">) {
  let { accessToken, refreshToken } = tokens;
  accessToken = accessToken.split('Bearer ')[1];
  const expires = cookieMaxAgeDays * 24 * 60 * 60;
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${expires}; SameSite=Strict`;
  localStorage.setItem('refreshToken', refreshToken);
}
