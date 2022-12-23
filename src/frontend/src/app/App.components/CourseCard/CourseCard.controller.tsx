import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseCardView } from './CourseCard.view'
import { getCoursesData } from 'helpers/coursesInfo'
import classNames from 'classnames'

interface ICourseCard {
  data: {
    courses: Course[] | undefined
    user?: PublicUser
    coursesLimit: number
    handleClickMore: () => void
  }
}

export const CourseCards = ({ data }: ICourseCard) => {
  const { courses, user, coursesLimit, handleClickMore } = data;

  const infoCourses = getCoursesData(courses || []);

  if (!courses) return null;

  return (
    <div className='home-courses-content__wrapper'>
      <div className={
        classNames(
          'home-courses-content__items',
          )
        }>
        {courses.map((course, index) => index < coursesLimit ? (
            <div
              key={course.title}
              className={
                classNames('panel-content home-courses-content__item')
              }
            >
              <CourseCardView user={user} infoCourses={infoCourses} course={course} />
            </div>
          ): null)}
      </div>

      {courses.length > coursesLimit ? (
        <div className='home-courses-content__show-more' onClick={handleClickMore}>
          <div className='home-courses-content__show-more-title'>Show more</div>
          <div className='home-courses-content__show-more-arrow' />
        </div>
      ) : null}
    </div>
  )
}
