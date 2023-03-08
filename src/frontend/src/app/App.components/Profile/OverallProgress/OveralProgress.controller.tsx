import React from 'react'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { OverallProgressView } from './OveralProgress.view'

interface ICourseCard {
  courses: Course[] | undefined
  user?: PublicUser

}

export const OverallProgress = ({ courses, user }: ICourseCard) => {
  const infoCourses = courses ?? [] as any

  return (<OverallProgressView user={user} infoCourses={infoCourses} />)
}