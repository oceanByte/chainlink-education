import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Option } from 'app/App.components/Select/Select.view'
import { State } from 'reducers'

// import { FooterView } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'

export const Profile = () => {
  const user = useSelector((state: State) => state.auth.user)

  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
  const [activeCourse, setActiveCourse] = useState(defaultCourse)
  return (
    <>
      <Header />
      <ProfileView
        user={user}
        activeCourse={activeCourse}
      />
      <FooterView />
    </>
  )
}
