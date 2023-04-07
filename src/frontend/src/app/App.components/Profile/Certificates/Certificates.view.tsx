import React from 'react'

import { useHistory } from 'react-router-dom'

import { CourseStatusType } from '../../../../pages/Course/Course.data'

import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'
import { BadgeView } from '../../Badge/Badge.view'
import { MainButtonView } from '../../MainButton/MainButton.view'
import { ShareCertificate } from '../../ShareCertificate/ShareCertificate.view'
import { IAdditionalInfo } from 'helpers/coursesInfo'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

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
  const history = useHistory()
  const courses = useSelector((state: State) => state.courses)
  return (
    <div className='profile-page-certificates-wrapper'>
      <div className='top-header'>
        <div className='profile-page-section__header h-font'>Badge collection</div>
        <div className='opened-badged'>
          You have opened <span>{infoCourses.numberCompletedCourses}</span> badges out of <span>{infoCourses.numberCourses}</span></div>
      </div>
      <div className='badges-list'>
        {user && courses
          ? courses.map((course: Course, key: number) => {
            const additionalInfo: IAdditionalInfo = (infoCourses as any).find((i: Course) => i.title === course.title)
            return (
              <div className="badge-wrapp" key={course.title}>
                <BadgeView percentage={additionalInfo.percent} title={course.title} isCompleted={course.status === CourseStatusType.COMPLETED} />
                <div className='title'>{course.title}</div>
              </div>
            )
          })
          : null}
      </div>
      {infoCourses.numberCompletedCourses ? (<div className='sections-content__line' />) : null}
      <div className='certificates-list'>
        {user && courses
          ? courses.map((course: Course, key: number) => {
            const currentCourse = courses.find((c: Course) => c.title === course.title);
            const additionalInfo: IAdditionalInfo = (infoCourses as any).find((i: Course) => i.title === course.title)
            return (
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
                        onClick={() => history.push(`/description/${currentCourse.urlCourse}`)}
                        loading={false}
                        disabled={false}
                      />
                      <ShareCertificate username={user.username} additionalInfo={additionalInfo} />
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            )
          })
          : null}
      </div>
    </div>
  )
}