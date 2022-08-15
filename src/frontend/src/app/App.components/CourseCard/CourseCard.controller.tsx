import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseCardView } from './CourseCard.view'
import { getCoursesData } from 'helpers/coursesInfo'

interface ICourseCard {
  courses: Course[] | undefined
  user?: PublicUser
}

export const CourseCards = ({ courses, user }: ICourseCard) => {
  const infoCourses = getCoursesData(courses || [])

  return (
    <>
      {courses
        ? courses.map((course) => (
            <div
              key={course.title}
              className={
                course.title !== 'Solidity 102' ? 'home-courses-content__item' : 'home-courses-content__item highlight'
              }
            >
              <CourseCardView user={user} infoCourses={infoCourses} course={course} />
            </div>
          ))
        : null}
    </>
  )
}
