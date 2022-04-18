import React from 'react'

import { CourseView } from './Course/Course.view'
import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

interface ICoursesListView {
  user?: PublicUser,
  copyToClipboard: () => void,
  downloadCallback: () => void,
  getCertificateCallback: (values: { name: string }) => void
}

export const CoursesListView = ({ user, copyToClipboard, downloadCallback, getCertificateCallback }: ICoursesListView) => {
  return (
    <>
      {user && user.courses
        ? user.courses.map((course: Course, key: number) => (
            <div className="profile-page-section__course" key={key}>
              <CourseView
                course={course}
                user={user}
                copyToClipboard={copyToClipboard}
                downloadCallback={downloadCallback}
                getCertificateCallback={getCertificateCallback}
              />
            </div>
          ))
        : null}
    </>
  )
}
