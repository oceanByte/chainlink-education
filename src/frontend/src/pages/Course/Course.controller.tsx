import * as React from 'react'

import { CourseView } from './Course.view'

export interface Course {
  path: string
  description: string | undefined
}

export type CourseData = {
  path: string
  pathname: string
  name: string
  data: Course
}

export const Course = () => {
  // bandaid
  const course = 'chainlinkIntroduction'

  return (
    <>
      <CourseView course={course} />
    </>
  )
}
