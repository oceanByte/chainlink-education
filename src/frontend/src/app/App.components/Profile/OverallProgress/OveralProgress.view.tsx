import React from 'react'
import { useHistory } from 'react-router-dom'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'

import { CourseStatusType } from 'pages/Course/Course.data'
import { MainButtonView } from '../../MainButton/MainButton.view'
import { CircularProgressBar } from '../../CircleProgressBar/CircleProgressBar.view'
import { BadgeView } from '../../Badge/Badge.view'
import { Difficulty } from 'app/App.components/CourseCard/Difficulty/Difficulty.view'
import { Course } from "shared/course"
import { useSelector } from 'react-redux'
import { State } from 'reducers'
import { IAdditionalInfo } from 'helpers/coursesInfo'

interface ICourseView {
  infoCourses: Course[]
  user?: PublicUser
}

export const OverallProgressView = ({ infoCourses, user }: ICourseView) => {

  const plainCourses = useSelector((state: State) => state.courses)
  const allChaptersLength = plainCourses.reduce((accum: any, currValue: any) => accum + currValue.chapters.length, 0)
  const completedChaptersLength = plainCourses.reduce((accum: any, currValue: any) => accum + currValue.progress.length, 0)
  const overallProgress = completedChaptersLength / allChaptersLength * 100

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
      {completedChaptersLength !== allChaptersLength ? (
        <>
          <div className='sections-content__line' />
          <div className='sections-content__courses'>
            {user && plainCourses ? plainCourses.map((course: IAdditionalInfo, index: number) => {
              // const additionalInfo = { ...course, ...infoCourses.find(i => i.title === course.title), ...plainCourses }
              // const additionalInfo = user ? { ...plainCourses[index], ...user.courses?.find((userCourse: any) => userCourse.title === course.title) } : course as IAdditionalInfo
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
                                percentage={course?.percent ?? 0}
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
                                  <div className='icon' /><div>{course?.countChapters} chapters</div>
                                </div>
                                <div className='course-additional-info__time item'>
                                  <div className='icon' /><div>{course?.amountOfTime}</div>
                                </div>
                                <div className='course-additional-info__difficulty'>
                                  <Difficulty difficulty={course.difficulty} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='course-additional-info outside'>
                            <div className='course-additional-info__chapters item'>
                              <div className='icon' /><div>{course.countChapters} chapters</div>
                            </div>
                            <div className='course-additional-info__time item'>
                              <div className='icon' /><div>{course.amountOfTime}</div>
                            </div>
                            <div className='course-additional-info__difficulty'>
                              <Difficulty difficulty={course.difficulty} />
                            </div>
                          </div>
                          <div className="course-description">{course.description}</div>
                        </div>
                        <div className={classnames('course-footer')}>
                          <div className="course-btn-wrapper">
                            {!course.percent ? <MainButtonView
                              isPrimary
                              hasArrowUpRight
                              text='View Course'
                              onClick={() =>
                                history.push(`${plainCourses[index].chapters[0].pathname}`)

                              }
                              loading={false}
                              disabled={false}
                            /> : null}
                            {course.percent && course.percent !== 100 ? <MainButtonView
                              isSecondary
                              hasArrowUpRight
                              text='Continue'
                              onClick={() => history.push(`/profile/progress/${course.urlCourse}`)}
                              loading={false}
                              disabled={false}
                            /> : null}
                          </div>
                          {user && course.percent && course.percent !== 100 ? (
                            <div className="course-footer__progress-bar">
                              <div className="circle-wrap">
                                <CircularProgressBar
                                  strokeWidth="7"
                                  sqSize="60"
                                  percentage={course.percent} />
                              </div>
                            </div>
                          ) : null}
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
