import { getCoursesData } from 'helpers/coursesInfo'
import * as React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { CertificatesView } from './Certificates.view'

interface ICertificates {
  user?: PublicUser
}

export const Certificates = ({ user }: ICertificates) => {
  const infoCourses = getCoursesData(user?.courses || [])

  return <CertificatesView user={user} infoCourses={infoCourses} />
}
