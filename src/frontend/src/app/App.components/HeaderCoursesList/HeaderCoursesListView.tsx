import React from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'
import { courseData, CourseNameType, CourseStatusType } from '../../../pages/Course/Course.data'
import { course as ChainlinkIntroduction } from '../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../pages/Courses/solidityIntroduction'
import { course as VDFIntroduction } from '../../../pages/Courses/vdfIntroduction'
import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'
import { CourseData } from 'pages/Course/Course.controller'

interface IChaptersListView {
  user?: PublicUser
  pathname: string,
  activeCourse: Option,
}

export const ChaptersListView = ({
  activeCourse,
  user,
  pathname,
}: IChaptersListView) => {

  if (!user) {
    return (
      <>
        {courseData.map((course: CourseData) => {
          let done = false;
          const currentPath = `/${course.path}/chapter-1`;

          if (user) {
            // done = user.progress ? user.progress.indexOf(chapter.pathname) >= 0 : false
            // nextChapter = user.progress ? checkChapter(user.progress, chapter.pathname) : ''
          }

        return (
          <Link
            to={currentPath}
            className={classnames(
              'header-chapters__item',
              done && 'checked',
              pathname === currentPath && 'current'
            )}
            key={course.path}
          >

            <div className="header-chapters__item__name">
              <span className="h-font">{course.name}</span>
            </div>
            {done ? (
              <div className={classnames('header-chapters__item__completion', 'completed')}>COMPLETED</div>
            ) : (<>
              {user && course.path === currentPath ? (
                <div className="header-chapters__item__completion continue">CONTINUE</div>
              ) : (
                <div className={classnames('header-chapters__item__completion', 'completed')}>NEW</div>
              )}
              </>
            )}
            
          </Link>
        )
      })}
      </>
    )
  }

  return (
    <>
      {user && user.courses ? user.courses.map((course: any) => {
        let done = false;
        let currentPath = `/`;

        if (course.title === CourseNameType.CHAINLINK_101) {
          currentPath = `/${ChainlinkIntroduction.path}/chapter-1`
        } else if (course.title === CourseNameType.SOLIDITY_INTRO) {
          currentPath = `/${SolidityIntroduction.path}/chapter-1`
        } else {
          currentPath = `/${VDFIntroduction.path}/chapter-1`
        }

        return (
          <Link
            to={currentPath}
            className={classnames(
              'header-chapters__item',
              done && 'checked',
              pathname === currentPath && 'current'
            )}
            key={course.title}
          >

            <div className="header-chapters__item__name">
              <span className="h-font">{course.title}</span>
            </div>
            <div className={classnames('header-chapters__item__completion', 'completed')}>
              {
                course.status === CourseStatusType.COMPLETED ?
                CourseStatusType.COMPLETED : course.status === CourseStatusType.IN_PROGRESS ?
                CourseStatusType.IN_PROGRESS : CourseStatusType.NEW
              }
            </div>
  
            
          </Link>
        )
      }) : null}
    </>
  )
}