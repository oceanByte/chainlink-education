import { store } from 'index'
import { ChangeEmailInputs } from 'shared/user/ChangeEmail'
import { GetPublicUserInputs } from 'shared/page/GetPublicUser'
import { SetNameInputs } from 'shared/page/SetName'
import { ChangeUsernameInputs } from 'shared/user/ChangeUsername'
import { IssueCertificateInputs } from 'shared/user/issueCertificate'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'

export const CHANGE_NFT_CERFICIATE = 'CHANGE_NFT_CERTIFICATE'
export const SET_NFT_CERTIFICATE_COMMIT = 'SET_CERTIFICATE_COMMIT'

export const setNftCertificate =
  ({ coursePath, address }: IssueCertificateInputs) =>
  (dispatch: any) => {
    dispatch({
      type: SET_NFT_CERTIFICATE_COMMIT,
      payload: { coursePath, address },
      meta: {
        offline: {
          effect: {
            url: `${process.env.REACT_APP_BACKEND_URL}/user/issue-certificate`,
            method: 'POST',
            headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
            json: { coursePath, address },
          },
          commit: {
            type: SET_NFT_CERTIFICATE_COMMIT,
            meta: {},
          },
        },
      },
    })
  }

export const CHANGE_ADDRESS = 'CHANGE_ADDRESS'
export const SET_ADDRESS_COMMIT = 'SET_ADDRESS_COMMIT'

export const changeAddress =
  ({ address }: IssueCertificateInputs) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGE_ADDRESS,
      payload: { address },
      meta: {
        offline: {
          effect: {
            url: `${process.env.REACT_APP_BACKEND_URL}/user/change-address`,
            method: 'POST',
            headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
            json: { address },
          },
          commit: {
            type: SET_ADDRESS_COMMIT,
            meta: {
              thunks: [showToaster(SUCCESS, 'Success', 'You can now issue and download your certificate')],
            },
          },
        },
      },
    })
  }

export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const SET_USERNAME_COMMIT = 'SET_USERNAME_COMMIT'

export const changeUsername =
  ({ username }: ChangeUsernameInputs) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGE_USERNAME,
      payload: { username },
      meta: {
        offline: {
          effect: {
            url: `${process.env.REACT_APP_BACKEND_URL}/user/change-username`,
            method: 'POST',
            headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
            json: { username },
          },
          commit: {
            type: SET_USERNAME_COMMIT,
            meta: {
              thunks: [getUser({ username })],
            },
          },
        },
      },
    })
  }
export const CHANGE_EMAIL_PENDING = 'CHANGE_EMAIL_PENDING'
export const SET_EMAIL_COMMIT = 'SET_EMAIL_COMMIT'

export const changeEmailPending =
  ({ email }: ChangeEmailInputs) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGE_EMAIL_PENDING,
      payload: { email },
      meta: {
        offline: {
          effect: {
            url: `${process.env.REACT_APP_BACKEND_URL}/user/change-email`,
            method: 'POST',
            headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
            json: { email },
          },
          commit: { type: SET_EMAIL_COMMIT, meta: {} },
        },
      },
    })
  }

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_COMMIT = 'GET_USER_COMMIT'
export const GET_USER_ROLLBACK = 'GET_USER_ROLLBACK'

export const getUser =
  ({ username }: GetPublicUserInputs) =>
  (dispatch: any) => {
    dispatch({
      type: GET_USER_REQUEST,
      payload: { username },
      meta: {
        offline: {
          effect: {
            url: `${process.env.REACT_APP_BACKEND_URL}/page/get-user`,
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

export const sendName =
  ({ name }: SetNameInputs) =>
  (dispatch: any) => {
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
