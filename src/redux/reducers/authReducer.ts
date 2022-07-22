import { TUser } from "../../types/types";
import {
  REG_REQUEST_ERROR,
  REG_REQUEST_SUBMIT,
  REG_REQUEST_SUCCESS,
  REG_ERROR_RESET,
  LOGIN_REQUEST_SUBMIT,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_REJECTED,
  LOGIN_REJECTION_RESET,
  LOGOUT_SUBMIT,
  GET_USER_INFO,
  RESET_USER_INFO,
  SET_LOGGEDIN,
  UPDATE_USER_INFO,
} from "../actions/authActions";
import { TAuthActions } from "../actions/authActions";

type TAuthInitState = {
  regRequest: boolean,
  isRegError: boolean,
  regErrorMessage: string | undefined,
  loginRequest: boolean,
  isLoggedIn: boolean,
  loginRejectionMessage: string | undefined,
  user: TUser,
}

const initialState: TAuthInitState = {
  regRequest: false,
  isRegError: false,
  regErrorMessage: '',
  loginRequest: false,
  isLoggedIn: false,
  loginRejectionMessage: '',
  user: {
    name: undefined,
    email: undefined,
  }
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthInitState => {
  switch (action.type) {
    case REG_REQUEST_SUBMIT: {
      return ({
        ...state,
        regRequest: true,
      })
    }

    case REG_REQUEST_SUCCESS: {
      return ({
        ...state,
        regRequest: false,
        user: action.user,
      })
    }

    case REG_REQUEST_ERROR: {
      return ({
        ...state,
        isRegError: true,
        regErrorMessage: action.message,
        regRequest: false,
      })
    }

    case REG_ERROR_RESET: {
      return ({
        ...state,
        isRegError: false,
        regErrorMessage: '',
      })
    }

    case LOGIN_REQUEST_SUBMIT: {
      return ({
        ...state,
        loginRequest: true,
      })
    }

    case LOGIN_REQUEST_SUCCESS: {
      return ({
        ...state,
        loginRequest: false,
        isLoggedIn: true,
        user: action.user,
      })
    }

    case SET_LOGGEDIN: {
      return ({
        ...state,
        isLoggedIn: true,
      })
    }

    case LOGIN_REQUEST_REJECTED: {
      return ({
        ...state,
        loginRequest: false,
        loginRejectionMessage: action.payload,
      })
    }

    case LOGIN_REJECTION_RESET: {
      return ({
        ...state,
        loginRejectionMessage: '',
      })
    }

    case LOGOUT_SUBMIT: {
      return ({
        ...state,
        isLoggedIn: false,
        user: {
          name: undefined,
          email: undefined
        },
      })
    }

    case GET_USER_INFO: {
      return ({
        ...state,
        user: action.user,
      })
    }

    case UPDATE_USER_INFO: {
      const user = {
        ...action.user,
      }

      if ('newPassword' in user) {
        delete user.newPassword;
      }

      return ({
        ...state,
        user: action.user,
      })
    }

    case RESET_USER_INFO: {
      return ({
        ...state,
        isLoggedIn: false,
        user: {
          name: undefined,
          email: undefined
        },
      })

    }

    default: {
      return state;
    }

  }
}
