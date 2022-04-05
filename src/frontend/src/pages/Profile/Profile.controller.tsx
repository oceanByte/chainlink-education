import * as React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { jsPDF } from 'jspdf'
import { State } from 'reducers'

// import { FooterView } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { ProfileView } from './Profile.view'
import { deleteAccountPending } from 'pages/DeleteAccount/DeleteAccount.actions'
import { changeEmailPending } from './Profile.actions'
import { getUser, sendName } from 'pages/User/User.actions'


export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)

  const downloadCallback = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1100, 800],
    })
    doc.addImage('/certificate.jpg', 'JPEG', 0, 0, 1100, 800)
    doc.setFontSize(50)
    doc.text(user?.name || '', 550, 410, { align: 'center' })
    doc.save('chainlink_academy_certifciate.pdf')
  }

  const changeEmailCallback = async ({ email }: { email: string }) => {
    dispatch(changeEmailPending({ email }))
  }

  const getCertificateCallback = ({ name }: { name: string }) => {
    dispatch(sendName({ name }))
  }

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
        downloadCallback={downloadCallback}
        getCertificateCallback={getCertificateCallback}
        changeEmailCallback={changeEmailCallback}
        deleteAccountCallback={deleteAccountCallback}
      />
      <FooterView />
    </>
  )
}
