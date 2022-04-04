import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { State } from 'reducers'
import { ResetPasswordInputs } from 'shared/user/ResetPassword'

import { resetPassword } from './ResetPassword.actions'
import { ResetPasswordView } from './ResetPassword.view'

export const ResetPassword = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  let key = new URLSearchParams(location.search).get("key");

  const loading = useSelector((state: State) => state.loading)

  const resetPasswordCallback = async (resetPasswordInputs: ResetPasswordInputs) => {
    dispatch(resetPassword({ ...resetPasswordInputs, token: key }))
  }

  return <ResetPasswordView resetPasswordCallback={resetPasswordCallback} loading={loading} />
}
