import React from 'react'
import { Link } from 'react-router-dom'

import { chaptersByCourse } from '../../../pages/Course/Course.data'
import { ChapterData } from '../../../pages/Chapter/Chapter.controller'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'
import { Course } from 'shared/course'

interface ICoursesView {
  user?: PublicUser
  pathname: string,
  activeCourse: Option,
}

export const CoursesView = ({
  activeCourse,
  user,
  pathname,
}: ICoursesView) => {
  return (
    <>
      {user && user.courses ? user.courses.map((course: Course, key: number) => { 

        const currentPath = `/course/${course._id}/chapter-${key + 1}`;

        return (
          <Link
            to={currentPath}
            className={classnames(
              'header-courses__item',
            )}
            key={key}
          >
            <span className="header-courses__item__name">
              <span className="h-font">{course.title}</span>
            </span>
          </Link>
        )
      }) : (
        <>
          <Link
            to={'/'}
            className={classnames(
              'header-courses__item',
            )}
          >
            <span className="header-courses__item__name">
              <span className="h-font">Test</span>
            </span>
          </Link>
        </>
      )}
    </>
  )
}