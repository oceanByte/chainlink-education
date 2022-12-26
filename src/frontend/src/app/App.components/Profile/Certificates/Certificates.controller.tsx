import * as React from 'react'

import { createGroupsBySubject, getCoursesData, getProgressGroups } from 'helpers/coursesInfo'

import { PublicUser } from 'shared/user/PublicUser'
import { CertificatesView } from './Certificates.view'

interface ICertificates {
  user?: PublicUser
}

export const Certificates = ({ user }: ICertificates) => {
  const infoCourses = getCoursesData(user?.courses || [])
  const groups = createGroupsBySubject(user?.courses  || []);

  const groupsWithProgress = getProgressGroups({
    groups,
    infoCourses
  })

  return <CertificatesView user={user} infoCourses={infoCourses} groups={groupsWithProgress} />
}
