import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseCardView } from './CourseCard.view'

interface ICourseCard {
  courses: Course[] | undefined
  user?: PublicUser
}

export const CourseCards = ({ courses, user }: ICourseCard) => {
  const infoCourses = courses ?? ([] as any)
  return (
    <>
      {courses
        ? courses.map((course) => {
            // Check if 'isPreview' is true, if so, do not render this course
            if (course.title === 'Automation Introduction') {
              return null
            }

            return (
              <div
                key={course.title}
                className={
                  course.title !== 'Automation Introduction'
                    ? 'home-courses-content__item'
                    : 'home-courses-content__item highlight'
                }
              >
                <CourseCardView user={user} infoCourses={infoCourses} course={course} />
              </div>
            )
          })
        : null}
    </>
  )
}
