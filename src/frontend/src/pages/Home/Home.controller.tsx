import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'
import { State } from 'reducers'
const scrollIntoView = require('scroll-into-view')

export const Home = () => {
  const user = useSelector((state: State) => state.auth.user)
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
    // console.log(contactUsInputs);
  }

  useEffect(() => {
    let url = window.location.href.split('/')
    let target = url[url.length - 1].toLowerCase()
    let element = document.getElementById(target.split('#')[1])
    if (element) {
      scrollIntoView(element, { time: 500 })
    }
  }, [])

  return <HomeView contactUsCallback={contactUsCallback} user={user} />
}
