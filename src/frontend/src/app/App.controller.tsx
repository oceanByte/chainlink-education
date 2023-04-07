import { ConnectedRouter } from 'connected-react-router'
import { getCourses } from 'pages/Home/Home.actions'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { ChapterDrawer, LoginDrawer } from './App.components/Drawer/Drawer.controller'
import { Gdpr } from './App.components/Gdpr/Gdpr.controller'
// import { HamburgerLeft, HamburgerRight } from './App.components/Hamburger/Hamburger.controller'
// import { Header } from './App.components/Header/Header.controller'
import { ProgressBar } from './App.components/ProgressBar/ProgressBar.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
// import { history } from './App.components/Toaster/Toaster.controller'
import { history } from './App.store'
import { AppBg } from './App.style'
import { AppView } from './App.view'


export const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)

  React.useEffect(() => {
    dispatch(getCourses())
  }, [dispatch, user])

  return (
    <ConnectedRouter history={history}>
      <AppBg>
        {/* <Header /> */}
        <ChapterDrawer />
        {/*<HamburgerLeft />*/}
        {/* chainlinkIntroduction/chapter-1 */}
        <LoginDrawer />
        {/* <HamburgerRight /> */}
        <AppView />
        <Toaster />
        <ProgressBar />
        <Gdpr />
      </AppBg>
    </ConnectedRouter>
  )

}
