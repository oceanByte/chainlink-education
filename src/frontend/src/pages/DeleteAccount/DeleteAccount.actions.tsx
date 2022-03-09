import { redirect } from 'app/App.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { LOGOUT } from 'pages/Login/Login.actions'
import { DeleteAccountPendingInputs, DeleteAccountPermanentlyInputs } from 'shared/user/DeleteAccount'


export const DELETE_ACCOUNT_PENDING = 'DELETE_ACCOUNT_PENDING'
export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST'
export const DELETE_ACCOUNT_COMMIT = 'DELETE_ACCOUNT_COMMIT'
export const DELETE_ACCOUNT_ROLLBACK = 'DELETE_ACCOUNT_ROLLBACK'

export const deleteAccountPending = ({ id }: DeleteAccountPendingInputs) => (dispatch: any) => {
  dispatch({
    type: DELETE_ACCOUNT_PENDING,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/delete-account`,
          method: 'POST',
          json: { id },
        },
        commit: { type: DELETE_ACCOUNT_COMMIT, meta: {} },
      },
    },
  })
}

export const deleteAccount = ({ token, password }: DeleteAccountPermanentlyInputs) => (dispatch: any) => {
  dispatch({
    type: DELETE_ACCOUNT_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/permanently-delete-account`,
          method: 'POST',
          json: { token, password },
        },
        commit: {
          type: LOGOUT,
          meta: {
            thunks: [
              showToaster(SUCCESS, 'Account deleted', ''),
              redirect('/'),
            ],
          },
        },
        rollback: { type: DELETE_ACCOUNT_ROLLBACK },
      },
    },
  })
}
