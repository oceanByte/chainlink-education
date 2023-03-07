import * as React from 'react'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

import { PublicUser } from 'shared/user/PublicUser'
import { CertificatesView } from './Certificates.view'

interface ICertificates {
  user?: PublicUser
}

export const Certificates = ({ user }: ICertificates) => {
  const courses = useSelector((state: State) => state.courses)

  return <CertificatesView user={user} infoCourses={user?.courses ?? courses} />
}
