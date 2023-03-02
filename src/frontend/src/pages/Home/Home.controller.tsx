import React, { useEffect } from 'react'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'
import { State } from 'reducers'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesTest } from './Home.actions'
const scrollIntoView = require('scroll-into-view')

export const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)
  const courses = useSelector((state: State) => state.courses)
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
    // console.log(contactUsInputs);
  }

  useEffect(() => {
    dispatch(getCoursesTest())
  }, [dispatch])

  useEffect(() => {
    let url = window.location.href.split('/')
    let target = url[url.length - 1].toLowerCase()
    let element = document.getElementById(target.split('#')[1])
    if (element) {
      scrollIntoView(element, { time: 500 })
    }
  }, [])

  return <HomeView contactUsCallback={contactUsCallback} courses={courses?.courses} user={user} />
}
