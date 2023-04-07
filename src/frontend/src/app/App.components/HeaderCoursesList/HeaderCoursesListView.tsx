import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'
import { CourseStatusType } from '../../../pages/Course/Course.data'

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
  const plainCourses: Course[] = useSelector((state: State) => state.courses)
  const currentCoursePath = pathname.split('/')[2]
  const plainCurrentCourse = useSelector((state: State) => state.courses.find((course: Course) => course.urlCourse === currentCoursePath))
  const courses = user ? plainCourses?.map((i: any) => {
    const course = plainCourses.find((course: Course) => course.title === i.title)
    return { ...i, chapters: course?.chapters, urlCourse: course?.urlCourse }
  }) : plainCourses

  const currentCourse = user ? plainCourses?.find((course: Course) => course.urlCourse === currentCoursePath) : plainCurrentCourse
  const coursePath = currentCourse?.urlCourse ?? '/'
  const currentPath = `/${coursePath}/chapter-1`
  const [state, setState] = useState({
    coursePath: '',
    currentPath: '',
    course: new Course(),
    isShowList: false,
  })

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
          courses?.map((course: Course) => {
            const currentPath = `/${course.urlCourse}/chapter-1`

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
                  <ChaptersListView user={user} coursePath={course.urlCourse} course={course} pathname={pathname} />
                </div>
              </div>
            )
          })}
      </>
    )
  }

  return (
    <>
      {user && plainCourses ? (
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
            courses?.map((course: any) => {
              if (isMobile) {
                return (
                  <div className="courses-container-mobile" key={course.id}>
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
                <div className="courses-container" key={course.id}>
                  <Link
                    to={course.chapters[0]}
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
                    <ChaptersListView user={user} coursePath={course.urlCourse} course={course} pathname={pathname} />
                  </div>
                </div>
              )
            })}
        </>
      ) : null}
    </>
  )
}
