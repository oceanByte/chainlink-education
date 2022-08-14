import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'
import { State } from 'reducers'

export const Home = () => {
  const user = useSelector((state: State) => state.auth.user)
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
    // console.log(contactUsInputs);
  }

  useEffect(() => {
    let url = window.location.href.split('/')
    let target = url[url.length - 1].toLowerCase()
    let element = document.getElementById(target)
    element && element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return <HomeView contactUsCallback={contactUsCallback} user={user} />
}
