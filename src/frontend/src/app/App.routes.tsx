/**
 * React Dependency
 * **/

import React from 'react'
import { Route, Switch } from 'react-router-dom'

/**
 * Custom Components
 * **/

import { Certificate } from 'pages/Certificate/Certificate.controller'
import { ChangePassword } from 'pages/ChangePassword/ChangePassword.controller'
import { Chapter } from 'pages/Chapter/Chapter.controller'
import { Course } from 'pages/Course/Course.controller'
import { Error404 } from 'pages/Error404/Error404.controller'
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword.controller'
import { Home } from 'pages/Home/Home.controller'
import { Login } from 'pages/Login/Login.controller'
import { ResetPassword } from 'pages/ResetPassword/ResetPassword.controller'
import { DeleteAccount } from 'pages/DeleteAccount/DeleteAccount.controller'
import { SignUp } from 'pages/SignUp/SignUp.controller'
import { Terms } from 'pages/Terms/Terms.controller'
import { User } from 'pages/User/User.controller'
import Header from './App.components/Header/Header.controller'
import { HeaderAuth } from './App.components/HeaderAuth/HeaderAuth.controller'
import { ThankYou } from '../pages/ThankYou/ThankYou.controller'
import { Footer } from './App.components/Footer/Footer.controller'
import Profile from '../pages/Profile/Profile.controller'
import { SiteMapView } from 'pages/SiteMap/SiteMap.view'
import { SiteMapContainer } from 'pages/SiteMap/SiteMap.style'
import { DescriptionCourse } from 'pages/DescriptionCourse/DescriptionCourse.controller'
import { PreviewCertificate } from 'pages/PreviewCertificate/PreviewCertificate.controller'

import PrivateRoute from 'containers/PrivateRoute'


// import { About } from 'pages/About/About.controller'

export const AppRoutes = ({ location }: any) => (
  <Switch location={location}>
    <Route exact path="/">
      <Header />
      <Home />
      <Footer />
    </Route>
    <Route exact path="/sign-up">
      <SignUp />
    </Route>
    <Route exact path="/login">
      <HeaderAuth />
      <Login />
    </Route>
    <Route exact path="/forgot-password">
      <HeaderAuth />
      <ForgotPassword />
    </Route>
    {/* <Route exact path="/reset-password/:token">
      <ResetPassword />
    </Route> */}
    <Route exact path="/reset-password">
      <HeaderAuth />
      <ResetPassword />
    </Route>

    <Route exact path="/change-password">
      <ChangePassword />
    </Route>

    <Route path="/*/chapter-*">
      <Header />
      <Chapter />
      <Footer />
    </Route>

    <Route path="/*/info">
      <Course />
    </Route>

    <Route path="/description/:courseId">
      <DescriptionCourse />
    </Route>

    <Route path="/verify/:courseId/:username">
      <PreviewCertificate />
    </Route>

    <PrivateRoute path="/:courseId/certificate/preview">
      <PreviewCertificate />
    </PrivateRoute>

    <PrivateRoute path="/profile">
      <Profile />
    </PrivateRoute>

    <PrivateRoute path="/delete-account">
      <HeaderAuth />
      <DeleteAccount />
    </PrivateRoute>

    <PrivateRoute path="/user/:username">
      <User />
    </PrivateRoute>

    <PrivateRoute path="/certificate/:username">
      <Certificate />
    </PrivateRoute>

    {/* <Route exact path="/about">
      <About />
    </Route> */}
    <Route exact path="/terms">
      <Terms />
    </Route>
    <Route exact path="/site-map">
      <SiteMapContainer>
        <Header />
        <SiteMapView />
      </SiteMapContainer>
    </Route>
    <Route exact path="/thank-you">
      <ThankYou />
    </Route>
    <Route>
      <Error404 />
    </Route>
  </Switch>
)
