import { authLogin } from "../../utils/auth/authLogin";
import { authLogout } from "../../utils/auth/authLogout";
import { authReg } from "../../utils/auth/authReg";
import { authGetUser } from "../../utils/auth/authGetUser";
import { authSetTokens } from "../../utils/auth/authSetTokens";
import { authRefreshToken } from "../../utils/auth/authRefreshToken";
import { authUpdateUserInfo } from "../../utils/auth/authUpdateUserInfo";

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
export const LOGOUT = 'LOGOUT_SUBMIT';

export function register(regData) {
  return function (dispatch) {
    dispatch({ type: REG_REQUEST_SUBMIT })
    authReg(regData)
      .then((regResponse) => {
        console.log('regResponse', regResponse)
        authSetTokens(regResponse)
        dispatch({ type: REG_REQUEST_SUCCESS, user: regResponse.user })
      })
      .catch((err) => {
        console.log('err in authReg', err, err.message)
        dispatch({ type: REG_REQUEST_ERROR, message: err.message })
      })
  }
}

export function login(loginData) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST_SUBMIT })
    authLogin(loginData)
      .then((loginResponse) => {
        authSetTokens(loginResponse)
        dispatch({ type: LOGIN_REQUEST_SUCCESS, user: loginResponse.user })
      })
      .catch((err) => dispatch({ type: LOGIN_REQUEST_REJECTED, payload: err.message }))
  }
}

export function logout() {
  return function (dispatch) {
    authLogout()
      .finally(() => {
        localStorage.removeItem('refreshToken');
        dispatch({ type: LOGOUT });
      })
  }
}

export function checkAuthorization() {
  return function (dispatch) {
    if (localStorage.getItem('refreshToken')) {
      authRefreshToken()
        .then((res) => authSetTokens(res))
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

export function updateUserInfo(userInfo) {
  return function (dispatch) {
    authUpdateUserInfo(userInfo)
      .then((data) => dispatch({ type: UPDATE_USER_INFO, user: data.user }))
  }
}
