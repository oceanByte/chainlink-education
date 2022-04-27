import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseProgressView } from './CourseProgress.view'
import { getCoursesData, IAdditionalInfo } from 'helpers/coursesInfo'
import { courseData } from 'pages/Course/Course.data'
import { Error404 } from 'pages/Error404/Error404.controller'

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

  const infoCourses = getCoursesData(courses || []);
  const currentCourse = courseData.find((course) => course.path === courseId);
  const courseAdditionalInfo: IAdditionalInfo = infoCourses.courses[currentCourse?.name || '']

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