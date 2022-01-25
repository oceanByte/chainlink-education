import * as React from 'react'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'

export const Home = () => {
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
    // console.log(contactUsInputs);
  }

  return <HomeView contactUsCallback={contactUsCallback} />
}
