import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseProgressView } from './CourseProgress.view'
import { Error404 } from 'pages/Error404/Error404.controller'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

interface ICourseCard {
  courses: Course[] | undefined
  user?: PublicUser
  showSubList: (isShow: boolean) => void
}

export type CourseID = {
  courseId: string
  username?: string
}

export const CourseProgress = ({ courses, user, showSubList }: ICourseCard) => {
  const { courseId } = useParams<CourseID>();
  const currentCourse = useSelector((state: State) => state.courses.find((course: Course) => course.urlCourse === courseId))
  const currentUserCourse = user?.courses?.find((course: Course) => course.title === currentCourse?.title)
  const courseAdditionalInfo = user ? { ...currentCourse, ...currentUserCourse } : currentCourse


  useEffect(() => {
    if (courseId) {
      showSubList(true)
    }
  }, [courseId, showSubList])

  if (!courseAdditionalInfo) {
    return <Error404 />
  }

  return (<CourseProgressView user={user} additionalInfo={courseAdditionalInfo} courseId={courseId} />)
}