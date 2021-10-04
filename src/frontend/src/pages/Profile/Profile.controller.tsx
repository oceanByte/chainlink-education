import * as React from 'react'
import { ProfileView } from './Profile.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { MainFooter } from '../../app/App.components/MainFooter/MainFooter.controller'
import { FooterView } from '../../app/App.components/Footer/Footer.view'

export const Profile = () => {
  return <>
    <Header />
    <ProfileView />
    <FooterView />
  </>
}
