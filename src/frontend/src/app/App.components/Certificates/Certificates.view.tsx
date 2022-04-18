import React from 'react'

import { CourseStatusType } from '../../../pages/Course/Course.data'

import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'
import { BadgeView } from '../Badge/Badge.view'
import { MainButtonView } from '../MainButton/MainButton.view'
import { ShareCertificate } from '../ShareCertificate/ShareCertificate.view'

export interface IDataCourses {
  courses: any
  overallProgress: number
  numberCompletedCourses: number
  numberCourses: number
}

interface ICertificatesView {
  user?: PublicUser
  infoCourses: IDataCourses
}

export const CertificatesView = ({ user, infoCourses }: ICertificatesView) => {
  return (
    <div className='profile-page-certificates-wrapper'>
      <div className='top-header'>
        <div className='profile-page-section__header h-font'>Badge collection</div>
        <div className='opened-badged'>
          You have opened <span>{infoCourses.numberCompletedCourses}</span> badges out of <span>{infoCourses.numberCourses}</span></div>
      </div>
      <div className='badges-list'>
      {user && user.courses
        ? user.courses.map((course: Course, key: number) => {
          const additionalInfo = infoCourses.courses[course.title]
          return (
            <div className="badge-wrapp" key={course.title}>
              <BadgeView percentage={additionalInfo.percent} title={course.title} isCompleted={course.status === CourseStatusType.COMPLETED} />
              <div className='title'>{course.title}</div>
            </div>
          )})
        : null}
      </div>
      {infoCourses.numberCompletedCourses ? (<div className='sections-content__line' />) : null}
      <div className='certificates-list'>
        {user && user.courses
          ? user.courses.map((course: Course, key: number) => (
              <React.Fragment key={key}>
                {course.status === CourseStatusType.COMPLETED ? (
                  <div className="certificate-wrapp" key={key}>
                    <div className='content'>
                      <div className='title'>{course.title}</div>
                      <div className='description'>{course.description}</div>
                    </div>
                    <div className="course-btn-wrapper">
                      <MainButtonView
                        isCompleted
                        isSecondary
                        hasArrowDown
                        text='Download certificate'
                        onClick={() => ({})}
                        loading={false}
                        disabled={false}
                        />
                        <ShareCertificate />
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  )
}