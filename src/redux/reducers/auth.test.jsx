import { authReducer } from "./authReducer";
import * as types from '../actions/authActions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
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
    )
  })
})

it('should handle REG_REQUEST_SUBMIT', () => {
  expect(
    authReducer([], {
      type: types.REG_REQUEST_SUBMIT,
    })
  ).toEqual(
    {
      regRequest: true,
    }
  )
})

it('should handle REG_REQUEST_SUCCESS', () => {
  expect(
    authReducer([], {
      type: types.REG_REQUEST_SUCCESS,
    })
  ).toEqual(
    {
      regRequest: false,
      user: undefined
    }
  )
})

it('should handle REG_REQUEST_ERROR', () => {
  expect(
    authReducer([], {
      type: types.REG_REQUEST_ERROR,
    })
  ).toEqual(
    {
      isRegError: true,
      regErrorMessage: undefined,
      regRequest: false,
    }
  )
})

it('should handle REG_ERROR_RESET', () => {
  expect(
    authReducer([], {
      type: types.REG_ERROR_RESET
    })
  ).toEqual(
    {
      isRegError: false,
      regErrorMessage: ''
    }
  )
})

it('should handle LOGIN_REQUEST_SUBMIT', () => {
  expect(
    authReducer([], {
      type: types.LOGIN_REQUEST_SUBMIT
    })
  ).toEqual(
    {
      loginRequest: true
    }
  )
})

it('should handle LOGIN_REQUEST_SUCCESS', () => {
  expect(
    authReducer([], {
      type: types.LOGIN_REQUEST_SUCCESS
    })
  ).toEqual(
    {
      loginRequest: false,
      isLoggedIn: true,
      user: undefined
    }
  )
})

it('should handle LOGIN_REQUEST_REJECTED', () => {
  expect(
    authReducer([], {
      type: types.LOGIN_REQUEST_REJECTED
    })
  ).toEqual(
    {
      loginRequest: false,
      loginRejectionMessage: undefined
    }
  )
})

it('should handle LOGIN_REJECTION_RESET', () => {
  expect(
    authReducer([], {
      type: types.LOGIN_REJECTION_RESET
    })
  ).toEqual(
    {
      loginRejectionMessage: ''
    }
  )
})

it('should handle LOGOUT_SUBMIT', () => {
  expect(
    authReducer([], {
      type: types.LOGOUT_SUBMIT
    })
  ).toEqual(
    {
      isLoggedIn: false,
      user: {
        name: undefined,
        email: undefined
      },
    }
  )
})

it('should handle GET_USER_INFO', () => {
  expect(
    authReducer([], {
      type: types.GET_USER_INFO
    })
  ).toEqual(
    {
      user: undefined
    }
  )
})

it('should handle UPDATE_USER_INFO', () => {
  expect(
    authReducer([], {
      type: types.UPDATE_USER_INFO
    })
  ).toEqual(
    {
      user: undefined
    }
  )
})

it('should handle RESET_USER_INFO', () => {
  expect(
    authReducer([], {
      type: types.RESET_USER_INFO
    })
  ).toEqual(
    {
      isLoggedIn: false,
      user: {
        email: undefined,
        name: undefined
      }
    }
  )
})

it('should handle SET_LOGGEDIN', () => {
  expect(
    authReducer([], {
      type: types.SET_LOGGEDIN
    })
  ).toEqual(
    {
      isLoggedIn: true
    }
  )
})
