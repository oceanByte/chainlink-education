import { store } from 'index'
import { GetPublicUserInputs } from 'shared/page/GetPublicUser'
import { SetAccountNameInputs } from 'shared/page/SetAccountName'
import { SetNameInputs } from 'shared/page/SetName'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_COMMIT = 'GET_USER_COMMIT'
export const GET_USER_ROLLBACK = 'GET_USER_ROLLBACK'

export const getUser = ({ username }: GetPublicUserInputs) => (dispatch: any) => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: { username },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/v1/users`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: { username },
        },
        commit: { type: GET_USER_COMMIT, meta: { username } },
        rollback: { type: GET_USER_ROLLBACK, meta: { username } },
      },
    },
  })
}

export const SET_NAME_REQUEST = 'SET_NAME_REQUEST'
export const SET_NAME_COMMIT = 'SET_NAME_COMMIT'
export const SET_NAME_ROLLBACK = 'SET_NAME_ROLLBACK'

export const sendName = ({ name }: SetNameInputs) => (dispatch: any) => {
  dispatch({
    type: SET_NAME_REQUEST,
    payload: { name },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/page/set-name`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: { name },
        },
        commit: { type: SET_NAME_COMMIT, meta: {} },
        rollback: { type: SET_NAME_ROLLBACK, meta: {} },
      },
    },
  })
}

export const SET_ACCOUNT_NAME_REQUEST = 'SET_ACCOUNT_NAME_REQUEST'
export const SET_ACCOUNT_NAME_COMMIT = 'GET_ACCOUNT_NAME_COMMIT'
export const SET_ACCOUNT_NAME_ROLLBACK = 'SET_ACCOUNT_NAME_ROLLBACK'

export const sendAccountName = ({ accountName }: SetAccountNameInputs) => (dispatch: any) => {
  dispatch({
    type: SET_ACCOUNT_NAME_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/page/set-account-name`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: { accountName },
        },
        commit: { type: SET_ACCOUNT_NAME_COMMIT, meta: {} },
        rollback: { type: SET_ACCOUNT_NAME_ROLLBACK, meta: {} },
      },
    },
  })
}
