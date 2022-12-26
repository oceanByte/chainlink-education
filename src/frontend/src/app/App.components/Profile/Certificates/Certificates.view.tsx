import React from 'react'

import { useHistory } from 'react-router-dom'

import { courseData, CourseStatusType } from '../../../../pages/Course/Course.data'

import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'
import { BadgeView } from '../../Badge/Badge.view'
import { MainButtonView } from '../../MainButton/MainButton.view'
import { ShareCertificate } from '../../ShareCertificate/ShareCertificate.view'
import { IAdditionalInfo, ICoursesGroups } from 'helpers/coursesInfo'

export interface IDataCourses {
  courses: any
  overallProgress: number
  numberCompletedCourses: number
  numberCourses: number
}

interface ICertificatesView {
  user?: PublicUser
  infoCourses: IDataCourses
  groups: ICoursesGroups[]
}

export const CertificatesView = ({ user, infoCourses, groups }: ICertificatesView) => {
  const history = useHistory()
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
          const additionalInfo: IAdditionalInfo = infoCourses.courses[course.title]
          return (
            <div className="badge-wrapp" key={course.title}>
              <BadgeView percentage={additionalInfo.percent} title={course.title} isCompleted={course.status === CourseStatusType.COMPLETED} />
              <div className='title'>{course.title}</div>
            </div>
          )})
        : null}
      </div>

      {infoCourses.numberCompletedCourses ? (
        <>
          <div className='sections-content__line' />
          <div className='sections-content__certificates'>
            <div className='sections-content__certificates-title'>
              Download certificates
            </div>
            <div className='sections-content__certificates-wrapper'>
              {groups.map(({ subject, courses, numberCompletedCourses }, key) => numberCompletedCourses ? (
                <div className='sections-content__certificates-group'>
                  <div className='sections-content__certificates-group-subject'>{subject}</div>
                  <div className='sections-content__certificates-group-items'>
                    {courses.map((course) => {
                      const currentCourse = courseData.find((c) => c.name === course.title);
                      const additionalInfo: IAdditionalInfo = infoCourses.courses[currentCourse?.name || '']

                      return (
                        <React.Fragment key={key}>
                          {course.status === CourseStatusType.COMPLETED ? (
                            <div className="course-wrapp" key={key}>
                              <div className='course-title'>{course.title}</div>
                              <div className="course-btn-wrapper">
 
                                <MainButtonView
                                  isCompleted
                                  isSecondary
                                  hasArrowDown
                                  noBorder
                                  text='Download certificate'
                                  onClick={() => history.push(currentCourse? `/description/${additionalInfo.urlCourse}`: '/')}
                                  loading={false}
                                  disabled={false}
                                  />
                                  {user !== undefined ? (
                                    <ShareCertificate username={user.username} additionalInfo={additionalInfo} className="isCertificate" />
                                  ): null}
                              </div>
                            </div>
                          ) : null}
                        </React.Fragment>
                      )})}
                  </div>
                </div>
              ): null
              )}
            </div>
          </div>
        </>
      ): null}
    </div>
  )
}