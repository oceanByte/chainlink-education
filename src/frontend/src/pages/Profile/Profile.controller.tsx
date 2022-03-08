import * as React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Option } from 'app/App.components/Select/Select.view'
import { State } from 'reducers'

// import { FooterView } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'
import { deleteAccountPending } from 'pages/DeleteAccount/DeleteAccount.actions'
import { changeEmailPending } from './Profile.actions'
import { getUser } from 'pages/User/User.actions'


export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)

  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
  const [activeCourse, setActiveCourse] = useState(defaultCourse)

  const changeEmailCallback = async ({ email }: { email: string }) => {
    dispatch(changeEmailPending({ email }))
  }

  const deleteAccountCallback = async () => {
    dispatch(deleteAccountPending({ id: user ? user._id : '' }))
  }

  useEffect(() => {
    dispatch(getUser({ username: user ? user.username : '' }))
  }, [])

  return (
    <>
      <Header />
      <ProfileView
        user={user}
        activeCourse={activeCourse}
        changeEmailCallback={changeEmailCallback}
        deleteAccountCallback={deleteAccountCallback}
      />
      <FooterView />
    </>
  )
}
