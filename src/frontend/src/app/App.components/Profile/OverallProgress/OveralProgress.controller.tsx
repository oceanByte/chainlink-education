import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { OverallProgressView } from './OveralProgress.view'
import { getCoursesData } from 'helpers/coursesInfo'

interface ICourseCard {
  courses: Course[] | undefined
  user?: PublicUser
}

export const OverallProgress = ({ courses, user }: ICourseCard) => {
  const infoCourses = getCoursesData(courses || []);

  return (<OverallProgressView user={user} infoCourses={infoCourses} />)
}