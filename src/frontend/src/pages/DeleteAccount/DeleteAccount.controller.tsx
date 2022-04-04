import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { State } from 'reducers'
import { DeleteAccountPermanentlyInputs } from 'shared/user/DeleteAccount'

import { deleteAccount } from './DeleteAccount.actions'
import { DeleteAccountView } from './DeleteAccount.view'

export const DeleteAccount = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const key = new URLSearchParams(location.search).get("key");

  const loading = useSelector((state: State) => state.loading)

  const deleteAccountCallback = async (deleteAccountInputs: DeleteAccountPermanentlyInputs) => {
    dispatch(deleteAccount({ ...deleteAccountInputs, token: key }))
  }

  return <DeleteAccountView deleteAccountCallback={deleteAccountCallback} loading={loading} />
}
