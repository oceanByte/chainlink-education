import * as React from 'react'
import { useSelector } from 'react-redux'
import { ContactUsInputs } from '../../shared/user/ContactUs'
import { HomeView } from './Home.view'
import { State } from 'reducers'

export const Home = () => {
  const user = useSelector((state: State) => state.auth.user)
  const contactUsCallback = async (contactUsInputs: ContactUsInputs) => {
    console.log(contactUsInputs);
  }

  return <HomeView contactUsCallback={contactUsCallback} user={user} />
}
