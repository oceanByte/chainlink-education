import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'
import { courseData, CourseNameType, CourseStatusType } from '../../../pages/Course/Course.data'

import { course as ChainlinkIntroduction } from '../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../pages/Courses/solidityIntroduction'
import { course as Solidity102 } from '../../../pages/Courses/solidity102'
import { course as vrfIntroduction } from '../../../pages/Courses/vrfIntroduction'
import { course as vrf102 } from '../../../pages/Courses/vrf102'

import { PublicUser } from 'shared/user/PublicUser'
import { CourseData } from 'pages/Course/Course.controller'
import { ChaptersListView } from '../ChaptersList/ChaptersListView'
import { Course } from 'shared/course'
import { createGroupsBySubject } from 'helpers/coursesInfo'

interface IChaptersListView {
  user?: PublicUser
  pathname: string
  isMobile?: boolean
}

interface ICoursePath {
  currentPath: string
  coursePath: string
  course?: any
}

export const CoursesListView = ({ user, pathname, isMobile }: IChaptersListView) => {
  const [state, setState] = useState({
    coursePath: '',
    currentPath: '',
    course: new Course(),
    isShowList: false,
  })

  const findCurrentCourse = (course: any): ICoursePath => {
    let currentPath = `/`
    let coursePath = `/`

    if (course.title === CourseNameType.CHAINLINK_101) {
      currentPath = `/${ChainlinkIntroduction.path}/chapter-1`
      coursePath = ChainlinkIntroduction.path
    } else if (course.title === CourseNameType.SOLIDITY_INTRO) {
      currentPath = `/${SolidityIntroduction.path}/chapter-1`
      coursePath = SolidityIntroduction.path
    } else if (course.title === CourseNameType.SOLIDITY_102) {
      currentPath = `/${Solidity102.path}/chapter-1`
      coursePath = Solidity102.path
    } else if (course.title === CourseNameType.VRF_V2) {
      currentPath = `/${vrfIntroduction.path}/chapter-1`
      coursePath = vrfIntroduction.path
    } else {
      currentPath = `/${vrf102.path}/chapter-1`
      coursePath = vrf102.path
    }

    return {
      currentPath,
      coursePath,
    }
  }

  const showChaptersList = ({ currentPath, coursePath, course }: ICoursePath) => {
    setState(() => ({
      currentPath,
      coursePath,
      course,
      isShowList: true,
    }))
  }

  const hideList = () => {
    setState((prev) => ({
      ...prev,
      isShowList: false,
    }))
  }

  const coursesBySubject = user && user.courses !== undefined ? createGroupsBySubject(user.courses): createGroupsBySubject(courseData);

  if (!user) {
    return (
      <>
        {state.isShowList ? (
          <div className="courses-container-mobile chapters-list">
            <div className="back-btn" onClick={hideList}>
              <div className="arrow-left"></div>
              <div className="btn__text">back</div>
            </div>
            <div className="chapters-container">
              <ChaptersListView user={user} coursePath={state.coursePath} course={state.course} pathname={pathname} />
            </div>
          </div>
        ) : null}

        {!state.isShowList ? (
          <>
            {coursesBySubject.map(({ subject, courses }) => (
              <div key={subject} className='courses-container-items'>
                <div className='courses-container__header'>
                  {subject}
                </div>
                <div className='courses-container__inner'>
                  {
                    courses.map((course: CourseData) => {
                      const currentPath = `/${course.path}/chapter-1`
                      const { coursePath } = findCurrentCourse({
                        ...course,
                        title: course.name,
                      })

                      const classNameItem = classnames("header-course__item", { "current": pathname === currentPath })
                      const emptyCourse = new Course()

                      const getItemBody = () => (
                        <>
                          <div className="header-course__item-name">
                            <span className="p-font">{course.name}</span>
                          </div>
                          <div className="header-course__item-status">
                            <div className={classnames('completion', 'completed')}>{CourseStatusType.NEW}</div>
                            <div className="arrow-right"></div>
                          </div>
                        </>
                      )
          
                      if (isMobile) {
                        return (
                          <div className="courses-container-mobile" key={course.path}>
                            <div
                              className={classNameItem}
                              onClick={() =>
                                showChaptersList({
                                  currentPath,
                                  coursePath,
                                  course,
                                })
                              }
                            >
                              {getItemBody()}
                            </div>
                          </div>
                        )
                      }
          
                      return (
                        <div className="courses-container" key={course.path}>
                          <Link
                            to={currentPath}
                            className={classNameItem}
                            key={course.path}
                          >
                            {getItemBody()}
                          </Link>
                          <div className="chapters-container no-user">
                            <ChaptersListView user={user} coursePath={coursePath} course={emptyCourse} pathname={pathname} />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            ))}
          </>
        ): null}
      </>
    )
  }

  return (
    <>
      {user && user.courses ? (
        <>
          {state.isShowList ? (
            <div className="courses-container-mobile chapters-list">
              <div className="back-btn" onClick={hideList}>
                <div className="arrow-left"></div>
                <div className="btn__text">back</div>
              </div>
              <div className="chapters-container">
                <ChaptersListView user={user} coursePath={state.coursePath} course={state.course} pathname={pathname} />
              </div>
            </div>
          ) : null}

          {!state.isShowList ? (
          <>
            {coursesBySubject.map(({ subject, courses }) => (
              <div key={subject} className='courses-container-items'>
                <div className='courses-container__header'>
                  {subject}
                </div>
                <div className='courses-container__inner'>
                  {
                    courses.map((course: Course) => {
                      const { currentPath, coursePath } = findCurrentCourse(course)
                      const classNameItem = classnames("header-course__item", { "current": pathname === currentPath })
                      const getItemBody = () => (
                        <>
                          <div className="header-course__item-name">
                            <span className="p-font">{course.title}</span>
                          </div>
                          <div className="header-course__item-status">
                            <div className={classnames('completion', 'completed')}>
                              {course.status === CourseStatusType.COMPLETED
                                ? CourseStatusType.COMPLETED
                                : course.status === CourseStatusType.IN_PROGRESS
                                ? CourseStatusType.IN_PROGRESS
                                : CourseStatusType.NEW}
                            </div>
                            <div className="arrow-right"></div>
                          </div>
                        </>
                      )
                      if (isMobile) {
                        return (
                          <div className="courses-container-mobile" key={course._id?.toString()}>
                            <div
                              className={classNameItem}
                              onClick={() =>
                                showChaptersList({
                                  currentPath,
                                  coursePath,
                                  course,
                                })
                              }
                            >
                              {getItemBody()}
                            </div>
                          </div>
                        )
                      }
        
                      return (
                        <div className="courses-container" key={course._id?.toString()}>
                          <Link
                            to={currentPath}
                            className={classNameItem}
                          >
                            {getItemBody()}
                          </Link>
                          <div className="chapters-container">
                            <ChaptersListView user={user} coursePath={coursePath} course={course} pathname={pathname} />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            ))}
          </>
        ): null}
        </>
      ) : null}
    </>
  )
}
