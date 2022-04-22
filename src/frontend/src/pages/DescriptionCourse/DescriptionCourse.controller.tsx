import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { State } from 'reducers'

import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { DescriptionCourseView } from './DescriptionCourse.view'

import { CourseID } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { getCoursesData } from 'helpers/coursesInfo'
import { courseData } from 'pages/Course/Course.data'
import { COURSES } from 'pages/Home/Home.view'


export const DescriptionCourse = () => {
  const { courseId } = useParams<CourseID>();
  const user = useSelector((state: State) => state.auth.user)

  const infoCourses = getCoursesData((user && user.courses) || COURSES);
  const currentCourse = courseData.find((course) => course.path === courseId);
  const additionalInfo = infoCourses.courses[currentCourse?.name || '']

  return (
    <>
      <Header />
      <DescriptionCourseView
        user={user}
        additionalInfo={additionalInfo}
      />
      <FooterView />
    </>
  )
}
