import React from 'react'
import { useHistory } from 'react-router-dom'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseStatusType } from 'pages/Course/Course.data'
import { IAdditionalInfo } from 'helpers/coursesInfo'
import { IDataCourses } from '../../Certificates/Certificates.view'
import { BadgeView } from 'app/App.components/Badge/Badge.view'
import { Difficulty } from 'app/App.components/CourseCard/Difficulty/Difficulty.view'
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view'

interface ICourseView {
  course: Course
  infoCourses: IDataCourses
  user?: PublicUser
}

export const CourseProgressCardView = ({ infoCourses, course, user }: ICourseView) => {
  const history = useHistory();
  const additionalInfo: IAdditionalInfo = infoCourses.courses[course.title]

  return (
    <React.Fragment key={course.title}>
      {course.status !== CourseStatusType.COMPLETED ? (
        <div className="course-inner">
          <div className='course-inner__container'>
            <div className='course-inner__top'>
              <div className='course-inner__header'>
                <div className='badge-container'>
                  <BadgeView
                    hasSmallBadge
                    percentage={additionalInfo.percent}
                    isCompleted={course.status === CourseStatusType.COMPLETED}
                    title={course.title}
                  />
                </div>
                <div className='title-wrapp'>
                  <div className="title h-font">
                    {course.title}
                  </div>
                  <div className='course-additional-info inside'>
                    <div className='course-additional-info__chapters item'>
                      <div className='icon'/><div>{additionalInfo.countChapters} chapters</div>
                    </div>
                    <div className='course-additional-info__time item'>
                      <div className='icon'/><div>{additionalInfo.amountOfTime}</div>
                    </div>
                    <div className='course-additional-info__difficulty'>
                      <Difficulty difficulty={course.difficulty} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='course-additional-info outside'>
                <div className='course-additional-info__chapters item'>
                  <div className='icon'/><div>{additionalInfo.countChapters} chapters</div>
                </div>
                <div className='course-additional-info__time item'>
                  <div className='icon'/><div>{additionalInfo.amountOfTime}</div>
                </div>
                <div className='course-additional-info__difficulty'>
                  <Difficulty difficulty={course.difficulty} />
                </div>
              </div>
              <div className="course-description">{course.description}</div>
            </div>
            <div className={classnames('course-footer')}>
              <div className="course-btn-wrapper">
                {!additionalInfo.percent ? <MainButtonView
                    isPrimary
                    hasArrowUpRight
                    text='View Course'
                    onClick={() => history.push(additionalInfo.urlChapter)}
                    loading={false}
                    disabled={false}
                  /> : null}
                {additionalInfo.percent && additionalInfo.percent !== 100 ? <MainButtonView
                    isSecondary
                    hasArrowUpRight
                    text='Continue'
                    onClick={() => history.push(`/profile/progress/${additionalInfo.urlCourse}`)}
                    loading={false}
                    disabled={false}
                  /> : null}
              </div>
              {user && additionalInfo.percent && additionalInfo.percent !== 100 ? (
                <div className="course-footer__progress-title">
                  Progress {additionalInfo.percent}%
                </div>
              ): null}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}
