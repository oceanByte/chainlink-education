import * as React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'

import { Option } from 'app/App.components/Select/Select.view'
import { State } from 'reducers'

// import { FooterView } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'
import { getUser, sendName } from './Profile.actions'

// export const Profile = () => {
//   const user = useSelector((state: State) => state.auth.user)

//   let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
//   const [activeCourse, setActiveCourse] = useState(defaultCourse)
  // return (
  //   <>
  //     <Header />
  //     <ProfileView
  //       user={user}
  //       activeCourse={activeCourse}
  //     />
  //     <FooterView />
  //   </>
  // )
// }


export const User = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  let { username } = useParams<{ username: string }>()
  // const user = useSelector((state: State) => (state.users as Record<string, PublicUser | undefined>)[username])
  const authUser = useSelector((state: State) => state.auth.user)
  const [name, setName] = useState<string>('')
  const [accountName, setAccountName] = useState<string>('')
  const user = useSelector((state: State) => state.auth.user)

  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
  const [activeCourse, setActiveCourse] = useState(defaultCourse)

  const downloadCallback = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1100, 800],
    })
    doc.addImage('/certificate.jpg', 'JPEG', 0, 0, 1100, 800)
    doc.setFontSize(50)
    doc.text(authUser?.name || '', 550, 460, { align: 'center' })
    doc.save('a4.pdf')
  }

  const getCertificateCallback = () => {
    dispatch(sendName({ name }))
  }
  useEffect(() => {
    dispatch(getUser({ username }))
  }, [dispatch, username])

  return (
    <>
      <Header />
      <ProfileView
        activeCourse={activeCourse}
        user={user}
        authUser={authUser}
        downloadCallback={downloadCallback}
        name={name}
        setName={setName}
        accountName={accountName}
        setAccountName={setAccountName}
        getCertificateCallback={getCertificateCallback}
      />
      <FooterView />
    </>
  )
  
}