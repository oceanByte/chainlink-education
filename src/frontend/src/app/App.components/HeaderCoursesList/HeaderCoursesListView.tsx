import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'
import { CourseNameType, CourseStatusType } from '../../../pages/Course/Course.data'

import { course as ChainlinkIntroduction } from '../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../pages/Courses/solidityIntroduction'
import { course as Solidity102 } from '../../../pages/Courses/solidity102'
import { course as vrfIntroduction } from '../../../pages/Courses/vrfIntroduction'
import { course as vrf102 } from '../../../pages/Courses/vrf102'

import { PublicUser } from 'shared/user/PublicUser'
import { ChaptersListView } from '../ChaptersList/ChaptersListView'
import { Course } from 'shared/course'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

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
  const courses: Course[] = useSelector((state: State) => state.courses)
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

        {!state.isShowList &&
          courses.map((course: Course) => {
            const currentPath = `/${course.urlCourse}/chapter-1`
            const { coursePath } = findCurrentCourse({
              ...course,
              title: course.title,
            })

            if (isMobile) {
              return (
                <div className="courses-container-mobile" key={course.urlCourse}>
                  <div
                    className={classnames('header-chapters__item', pathname === currentPath && 'current')}
                    onClick={() =>
                      showChaptersList({
                        currentPath,
                        coursePath,
                        course,
                      })
                    }
                  >
                    <div className="header-chapters__item__name">
                      <span className="h-font">{course.title}</span>
                    </div>
                    <div className="header-chapters__item__status">
                      <div className={classnames('completion', 'completed')}>{CourseStatusType.NEW}</div>
                      <div className="arrow-right"></div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div className="courses-container" key={course.urlCourse}>
                <Link
                  to={currentPath}
                  className={classnames('header-chapters__item', pathname === currentPath && 'current')}
                  key={course.urlCourse}
                >
                  <div className="header-chapters__item__name">
                    <span className="h-font">{course.title}</span>
                  </div>
                  <div className="header-chapters__item__status">
                    <div className={classnames('completion', 'completed')}>{CourseStatusType.NEW}</div>
                    <div className="arrow-right"></div>
                  </div>
                </Link>
                <div className="chapters-container no-user">
                  <ChaptersListView user={user} coursePath={coursePath} course={course} pathname={pathname} />
                </div>
              </div>
            )
          })}
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

          {!state.isShowList &&
            user.courses.map((course: any) => {
              const { currentPath, coursePath } = findCurrentCourse(course)
              if (isMobile) {
                return (
                  <div className="courses-container-mobile" key={course._id}>
                    <div
                      className={classnames('header-chapters__item', pathname === currentPath && 'current')}
                      onClick={() =>
                        showChaptersList({
                          currentPath,
                          coursePath,
                          course,
                        })
                      }
                    >
                      <div className="header-chapters__item__name">
                        <span className="h-font">{course.title}</span>
                      </div>
                      <div className="header-chapters__item__status">
                        <div className={classnames('completion', 'completed')}>
                          {course.status === CourseStatusType.COMPLETED
                            ? CourseStatusType.COMPLETED
                            : course.status === CourseStatusType.IN_PROGRESS
                              ? CourseStatusType.IN_PROGRESS
                              : CourseStatusType.NEW}
                        </div>
                        <div className="arrow-right"></div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div className="courses-container" key={course._id}>
                  <Link
                    to={currentPath}
                    className={classnames('header-chapters__item', pathname === currentPath && 'current')}
                  >
                    <div className="header-chapters__item__name">
                      <span className="h-font">{course.title}</span>
                    </div>
                    <div className="header-chapters__item__status">
                      <div className={classnames('completion', 'completed')}>
                        {course.status === CourseStatusType.COMPLETED
                          ? CourseStatusType.COMPLETED
                          : course.status === CourseStatusType.IN_PROGRESS
                            ? CourseStatusType.IN_PROGRESS
                            : CourseStatusType.NEW}
                      </div>
                      <div className="arrow-right"></div>
                    </div>
                  </Link>
                  <div className="chapters-container">
                    <ChaptersListView user={user} coursePath={coursePath} course={course} pathname={pathname} />
                  </div>
                </div>
              )
            })}
        </>
      ) : null}
    </>
  )
}
