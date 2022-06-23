import {
  REG_REQUEST_ERROR,
  REG_REQUEST_SUBMIT,
  REG_REQUEST_SUCCESS,
  REG_ERROR_RESET,
  LOGIN_REQUEST_SUBMIT,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  GET_USER_INFO,
  RESET_USER_INFO,
} from "../actions/authActions";

const initialState = {
  regRequest: false,
  isRegError: false,
  loginReguest: false,
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
      console.log('action', action);
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
        user: action.user,
      })
    }

    case LOGOUT: {
      console.log('reducer LOGOUT');
      return ({
        ...state,
        user: {},
      })
    }

    case GET_USER_INFO: {
      console.log('reducer SAVE_USER_INFO')
      return ({
        ...state,
        user: action.user,
      })
    }

    case RESET_USER_INFO: {
      return ({
        ...state,
        user: {},
      })

    }

    default: {
      return state;
    }

  }
}
