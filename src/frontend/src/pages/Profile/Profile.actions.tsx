import { store } from 'index'
import { ChangeEmailInputs } from 'shared/user/ChangeEmail'


export const CHANGE_EMAIL_PENDING = 'CHANGE_EMAIL_PENDING'
export const SET_EMAIL_COMMIT = 'SET_EMAIL_COMMIT'

export const changeEmailPending = ({ email }: ChangeEmailInputs) => (dispatch: any) => {
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