import * as React from 'react'
import { useEffect } from 'react'
import {  useDispatch, connect } from 'react-redux'

import { FooterView } from '../../app/App.components/Footer/Footer.view'
import Header from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'
import { deleteAccountPending } from 'pages/DeleteAccount/DeleteAccount.actions'
import { changeEmailPending, changeUsername } from './Profile.actions'
import { getUser } from 'pages/User/User.actions'
import { State } from 'reducers'

export interface IChangeUsernameEmail {
  email?: string
  username?: string
}

const Profile = ({ user }: any) => {
  const dispatch = useDispatch()

  const changeEmailOrUsernameCallback = async ({ email, username }: IChangeUsernameEmail) => {

    if (username) {
      dispatch(changeUsername({ username }))
    }

    if (email) {
      dispatch(changeEmailPending({ email }))
    }
    
  }

  // const getCertificateCallback = ({ name }: { name: string }) => {
  //   dispatch(sendName({ name }))
  // }

  const deleteAccountCallback = async () => {
    dispatch(deleteAccountPending({ id: user ? user._id : '' }))
  }

  useEffect(() => {
    dispatch(getUser({ username: user ? user.username : '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <ProfileView
        user={user}
        changeEmailOrUsernameCallback={changeEmailOrUsernameCallback}
        deleteAccountCallback={deleteAccountCallback}
      />
      <FooterView />
    </>
  )
}

export default connect(
  (state: State) => ({
    user: state.auth.user,
  }), {})(Profile);
