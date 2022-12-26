import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'

import { IDataCourses } from '../Certificates/Certificates.view'
import { Accordion } from 'app/App.components/Accordion/Accordion.controller'
import { ICoursesGroups } from 'helpers/coursesInfo'


interface ICourseView {
  infoCourses: IDataCourses
  user?: PublicUser
  groupsCourses: ICoursesGroups[]
}

export const OverallProgressView = ({ infoCourses, user, groupsCourses }: ICourseView) => {
  const { numberCompletedCourses, numberCourses } = infoCourses

  return (
    <div className='profile-page-progress-wrapper'>
      <div className='top-inner'>
        <div className='profile-page-section__header h-font'>Overall progress</div>
        <div className='profile-page-section__description'>
          Progress is calculated as the arithmetic mean of all the courses you started.
        </div>
      </div>
      {numberCompletedCourses !== numberCourses ? (
        <>
          <div className='sections-content__line' />

          <div>
            <Accordion courses={groupsCourses} user={user} type="profile" />
          </div>
        </>
      ) : null}
    </div>
  )
}
