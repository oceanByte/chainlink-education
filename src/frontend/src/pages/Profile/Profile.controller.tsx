import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { jsPDF } from 'jspdf'
import { Option } from 'app/App.components/Select/Select.view'
import { State } from 'reducers'

// import { FooterView } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'

export const Profile = () => {
  const user = useSelector((state: State) => state.auth.user)

  const downloadCallback = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1100, 800],
    })
    doc.addImage('/certificate.jpg', 'JPEG', 0, 0, 1100, 800)
    doc.setFontSize(50)
    doc.text(user?.username || '', 550, 410, { align: 'center' })
    doc.save('chainlink_academy_certifciate.pdf')
  }

  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
  const [activeCourse, ] = useState(defaultCourse)
  return (
    <>
      <Header />
      <ProfileView
        user={user}
        activeCourse={activeCourse}
        downloadCallback={downloadCallback}
      />
      <FooterView />
    </>
  )
}
