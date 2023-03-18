import React, { useEffect } from 'react'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'
import { State } from 'reducers'
import { useSelector } from 'react-redux'
import { Course } from 'shared/course'

const scrollIntoView = require('scroll-into-view')

export const Home = () => {

  const user = useSelector((state: State) => state.auth.user)
  const courses: Course[] = useSelector((state: State) => state.courses) ?? []
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
  }


  useEffect(() => {
    let url = window.location.href.split('/')
    let target = url[url.length - 1].toLowerCase()
    let element = document.getElementById(target.split('#')[1])
    if (element) {
      scrollIntoView(element, { time: 500 })
    }
  }, [])

  return <HomeView contactUsCallback={contactUsCallback} courses={courses} user={user} />
}
