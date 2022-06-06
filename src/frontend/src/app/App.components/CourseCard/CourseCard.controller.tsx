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
  const infoCourses = getCoursesData(courses || []);

  return (
    <>
      {courses ? courses.map((course) => (
        <div key={course.title} className='home-courses-content__item'>
          <CourseCardView user={user} infoCourses={infoCourses} course={course} />
        </div>)
      ) : null}
    </>
  )
}
