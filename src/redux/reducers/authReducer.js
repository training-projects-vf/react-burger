import {
  REG_REQUEST_ERROR,
  REG_REQUEST_SUBMIT,
  REG_REQUEST_SUCCESS,
  REG_ERROR_RESET,
  LOGIN_REQUEST_SUBMIT,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_REJECTED,
  LOGIN_REJECTION_RESET,
  LOGOUT,
  GET_USER_INFO,
  RESET_USER_INFO,
  SET_LOGGEDIN,
  UPDATE_USER_INFO,
} from "../actions/authActions";

const initialState = {
  regRequest: false,
  isRegError: false,
  loginReguest: false,
  isLoggedIn: false,
  loginRejectionMessage: null,
  user: {},
}

export const authReducer = (state = initialState, action) => {
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
        loginReguest: true,
      })
    }

    case LOGIN_REQUEST_SUCCESS: {
      return ({
        ...state,
        loginReguest: false,
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
        loginReguest: false,
        loginRejectionMessage: action.payload,
      })
    }

    case LOGIN_REJECTION_RESET: {
      return ({
        ...state,
        loginRejectionMessage: null,
      })
    }

    case LOGOUT: {
      return ({
        ...state,
        isLoggedIn: false,
        user: {},
      })
    }

    case GET_USER_INFO: {
      return ({
        ...state,
        user: action.user,
      })
    }

    case UPDATE_USER_INFO: {
      return ({
        ...state,
        user: action.user,
      })
    }

    case RESET_USER_INFO: {
      return ({
        ...state,
        isLoggedIn: false,
        user: {},
      })

    }

    default: {
      return state;
    }

  }
}
