import React from 'react'
import { useHistory } from 'react-router-dom'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'

import { CourseStatusType } from 'pages/Course/Course.data'
import { MainButtonView } from '../../MainButton/MainButton.view'
import { CircularProgressBar } from '../../CircleProgressBar/CircleProgressBar.view'
import { BadgeView } from '../../Badge/Badge.view'
import { IDataCourses } from '../Certificates/Certificates.view'
import { Difficulty } from 'app/App.components/CourseCard/Difficulty/Difficulty.view'
import { IAdditionalInfo } from 'helpers/coursesInfo'

interface ICourseView {
  infoCourses: IDataCourses
  user?: PublicUser
}

export const OverallProgressView = ({ infoCourses, user }: ICourseView) => {
  const { overallProgress, numberCompletedCourses, numberCourses } = infoCourses
  const history = useHistory();
  return (
    <div className='profile-page-progress-wrapper'>
      <div className='top-header'>
        <div>
          <div className='profile-page-section__header h-font'>Overall progress</div>
          <div className='profile-page-section__description'>
            Progress is calculated as the arithmetic mean of all the courses you started.
          </div>
        </div>
        <div className="circle-wrap">
          <CircularProgressBar
            strokeWidth="7"
            sqSize="80"
            percentage={overallProgress}
            isOverallProgress
          />
        </div>
      </div>
      {numberCompletedCourses !== numberCourses ? (
        <>
          <div className='sections-content__line' />
          <div className='sections-content__courses'>
            {user && user.courses ? user.courses.map((course) => {
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
                            <div className="course-footer__progress-bar">
                              <div className="circle-wrap">
                                <CircularProgressBar
                                  strokeWidth="7"
                                  sqSize="60"
                                  percentage={additionalInfo.percent}/>
                              </div>
                              </div>
                          ): null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              )
            }) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
