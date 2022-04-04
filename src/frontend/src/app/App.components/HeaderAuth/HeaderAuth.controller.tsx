import { logout } from 'pages/Login/Login.actions'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { State } from 'reducers'

import { HeaderView } from './HeaderAuth.view'

interface IHeaderAuth {
  isSignUp?: boolean
}

export const HeaderAuth = ({
  isSignUp
}: IHeaderAuth) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)

  function removeAuthUserCallback() {
    dispatch(logout())

    history.push('/');
  }

  return <HeaderView user={user} removeAuthUserCallback={removeAuthUserCallback} isSignUp={isSignUp} />
}
