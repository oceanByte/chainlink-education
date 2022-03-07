import React from 'react'

import { CourseView } from './Course/Course.view'
import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'
import { Course } from 'shared/course'

interface ICoursesListView{
  user?: PublicUser
}

export const CoursesListView = ({
  user,
}: ICoursesListView) => {
  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }
  return (
    <>
      { user && user.courses ?
        user.courses.map((course: Course, key: number)=> (
          <div className='profile-page-section__course' key={key}>
            <CourseView course={course} user={user} activeCourse={defaultCourse} />
          </div>
         ))
        : null
      }
    </>
  )
}