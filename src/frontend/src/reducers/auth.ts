import { RESET, RESTORE } from 'app/App.actions'
import { ADD_PROGRESS_COMMIT } from 'pages/Chapter/Chapter.actions'
import { DELETE_ACCOUNT_COMMIT } from 'pages/DeleteAccount/DeleteAccount.actions'
import { FORGOT_PASSWORD_COMMIT } from 'pages/ForgotPassword/ForgotPassword.actions'
import { LOGIN_COMMIT, LOGIN_ROLLBACK, LOGOUT } from 'pages/Login/Login.actions'
import { SET_EMAIL_COMMIT } from 'pages/Profile/Profile.actions'
import { SIGN_UP_COMMIT, SIGN_UP_ROLLBACK } from 'pages/SignUp/SignUp.actions'
import { GET_USER_COMMIT, SET_NAME_COMMIT, SET_ACCOUNT_NAME_ROLLBACK, SET_ACCOUNT_NAME_COMMIT } from 'pages/User/User.actions'
import { Jwt } from 'shared/user/Jwt'
import { PublicUser } from 'shared/user/PublicUser'

export interface AuthState {
  jwt?: Jwt
  user?: PublicUser
  resetPasswordToken?: string
}

const authDefaultState: AuthState = {
  jwt: undefined,
  user: undefined,
  resetPasswordToken: undefined
}

export function auth(state = authDefaultState, action: any): AuthState {
  switch (action.type) {
    case RESET: {
      return authDefaultState
    }
    case RESTORE: {
      return {
        ...state,
        resetPasswordToken: undefined
      }
    }
    case SIGN_UP_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
      }
    }
    case SIGN_UP_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    }
    case LOGOUT:
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    case LOGIN_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
      }
    }
    case LOGIN_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    }
    case FORGOT_PASSWORD_COMMIT: {
      return {
        ...state,
        resetPasswordToken: action.payload.token,
      }
    }
    case SET_NAME_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case SET_EMAIL_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case DELETE_ACCOUNT_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case GET_USER_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case SET_ACCOUNT_NAME_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case SET_ACCOUNT_NAME_ROLLBACK: {
      return state
    }
    case ADD_PROGRESS_COMMIT: {
      return state
    }
    default:
      return state
  }
}
