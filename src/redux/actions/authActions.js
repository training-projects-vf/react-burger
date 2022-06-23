import { authLogin } from "../../utils/auth/authLogin";
import { authLogout } from "../../utils/auth/authLogout";
import { authReg } from "../../utils/auth/authReg";
import { authGetUser } from "../../utils/auth/authGetUser";
import { setTokens } from "../../utils/setTokens";

export const REG_REQUEST_SUBMIT = 'REG_REQUEST';
export const REG_REQUEST_SUCCESS = 'REG_REQUEST_SUCCESS';
export const REG_REQUEST_ERROR = 'REG_REQUEST_FAIL';
export const REG_ERROR_RESET = 'REG_ERROR_RESET';
export const LOGIN_REQUEST_SUBMIT = 'LOGIN_REQUEST_SUBMIT';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const LOGOUT = 'LOGOUT_SUBMIT';

export function register(regData) {
  return function (dispatch) {
    dispatch({ type: REG_REQUEST_SUBMIT })
    authReg(regData)
      .then((regResponse) => {
        console.log('regResponse', regResponse)
        setTokens(regResponse)
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
        console.log('loginResponse', loginResponse)
        setTokens(loginResponse)
        authGetUser()
        dispatch({ type: LOGIN_REQUEST_SUCCESS, user: loginResponse.user })
      })
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

export function getUser() {
  return function (dispatch) {
    authGetUser()
      .then((user) => dispatch({ type: GET_USER_INFO, user }))
      .catch(() => dispatch({ type: RESET_USER_INFO }))
  }
}
