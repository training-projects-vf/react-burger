import { authLogin } from "../../utils/auth/authLogin";
import { authLogout } from "../../utils/auth/authLogout";
import { authReg } from "../../utils/auth/authReg";
import { authGetUser } from "../../utils/auth/authGetUser";
import { authSetTokens } from "../../utils/auth/authSetTokens";
import { authRefreshToken } from "../../utils/auth/authRefreshToken";
import { authUpdateUserInfo } from "../../utils/auth/authUpdateUserInfo";
import { TUser } from "../../types/types";
import { AppDispath } from "../store";

export const REG_REQUEST_SUBMIT = 'REG_REQUEST';
export const REG_REQUEST_SUCCESS = 'REG_REQUEST_SUCCESS';
export const REG_REQUEST_ERROR = 'REG_REQUEST_FAIL';
export const REG_ERROR_RESET = 'REG_ERROR_RESET';
export const LOGIN_REQUEST_SUBMIT = 'LOGIN_REQUEST_SUBMIT';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const SET_LOGGEDIN = 'SET_LOGGEDIN';
export const LOGIN_REQUEST_REJECTED = 'LOGIN_REQUEST_REJECTED';
export const LOGIN_REJECTION_RESET = 'LOGIN_REJECTION_RESET';
export const GET_USER_INFO = 'GET_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const LOGOUT_SUBMIT = 'LOGOUT_SUBMIT';

export interface IRegRequestSubmitAction {
  readonly type: typeof REG_REQUEST_SUBMIT;
}

export interface IRegRequestSuccessAction {
  readonly type: typeof REG_REQUEST_SUCCESS;
  readonly user: TUser;
}

export interface IRegRequestErrorAction {
  readonly type: typeof REG_REQUEST_ERROR;
  readonly message: string;
}

export interface IRegErrorResetAction {
  readonly type: typeof REG_ERROR_RESET;
}

export interface ILoginRequestSubmitAction {
  readonly type: typeof LOGIN_REQUEST_SUBMIT;
}

export interface ILoginRequestSuccessAction {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
  readonly user: TUser;
}

export interface ISetLoggedInAction {
  readonly type: typeof SET_LOGGEDIN;
}

export interface ILoginRequestRejectedAction {
  readonly type: typeof LOGIN_REQUEST_REJECTED;
  readonly payload: string;
}

export interface ILoginRejectionResetAction {
  readonly type: typeof LOGIN_REJECTION_RESET;
}

export interface IGetUserInfoAction {
  readonly type: typeof GET_USER_INFO;
  readonly user: TUser;
}

export interface IResetUserInfoAction {
  readonly type: typeof RESET_USER_INFO;
}

export interface IUpdateUserInfoAction {
  readonly type: typeof UPDATE_USER_INFO;
  readonly user: TUpdatedUserInfo;
}

export interface ILogoutSubmitAction {
  readonly type: typeof LOGOUT_SUBMIT;
}

export type TAuthActions =
  | IRegRequestSubmitAction
  | IRegRequestSuccessAction
  | IRegRequestErrorAction
  | IRegErrorResetAction
  | ILoginRequestSubmitAction
  | ILoginRequestSuccessAction
  | ISetLoggedInAction
  | ILoginRequestRejectedAction
  | ILoginRejectionResetAction
  | IGetUserInfoAction
  | IResetUserInfoAction
  | IUpdateUserInfoAction
  | ILogoutSubmitAction;

type TRegData = {
  name: string,
  email: string,
  password: string;
}

export type TRegResponse = {
  user: TUser;
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export function register(regData: TRegData) {
  return function (dispatch: AppDispath) {
    dispatch({ type: REG_REQUEST_SUBMIT })
    authReg(regData)
      .then((regResponse: TRegResponse) => {
        authSetTokens(regResponse)
        dispatch({ type: REG_REQUEST_SUCCESS, user: regResponse.user })
      })
      .catch((err: Error) => {
        dispatch({ type: REG_REQUEST_ERROR, message: err.message })
      })
  }
}

type TLoginData = {
  email: string;
  password: string;
}

export type TLoginResponse = TRegResponse;

export function login(loginData: TLoginData) {
  return function (dispatch: AppDispath) {
    dispatch({ type: LOGIN_REQUEST_SUBMIT })
    authLogin(loginData)
      .then((loginResponse: TLoginResponse) => {
        authSetTokens(loginResponse)
        dispatch({ type: LOGIN_REQUEST_SUCCESS, user: loginResponse.user })
      })
      .catch((err) => dispatch({ type: LOGIN_REQUEST_REJECTED, payload: err.message }))
  }
}

export function logout() {
  return function (dispatch: AppDispath) {
    authLogout()
      .finally(() => {
        localStorage.removeItem('refreshToken');
        dispatch({ type: LOGOUT_SUBMIT });
      })
  }
}

type TRefreshTokenRes = Omit<TRegResponse, "user">;

export function checkAuthorization() {
  return function (dispatch: AppDispath) {
    if (localStorage.getItem('refreshToken')) {
      authRefreshToken()
        .then((res: TRefreshTokenRes) => {
          authSetTokens(res)
        })
        .then(() => {
          authGetUser()
            .then((data) => {
              dispatch({ type: GET_USER_INFO, user: data.user })
              dispatch({ type: SET_LOGGEDIN })
            })
            .catch(() => dispatch({ type: RESET_USER_INFO }))
        })
        .catch((err) => console.log('err in refreshToken', err));
    }
  }
}

export type TUpdatedUserInfo = TUser & {
  newPassword?: string | null;
}

export function updateUserInfo(userInfo: TUpdatedUserInfo) {
  return function (dispatch: AppDispath) {
    authUpdateUserInfo(userInfo)
      .then((data) => dispatch({ type: UPDATE_USER_INFO, user: data.user }))
  }
}
