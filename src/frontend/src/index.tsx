import * as React from 'react'
import ReactGA from 'react-ga'
import { hotjar } from 'react-hotjar';
// @ts-ignore
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import TwitterConvTrkr from 'react-twitter-conversion-tracker'
import LogRocket from 'logrocket'

import { App } from './app/App.controller'
import { configureStore } from './app/App.store'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import './styles/fonts.css'

import './styles/main.scss'

export const store = configureStore({})

const LOG_ROCKET_PROJECT_ID = 'vq2xcu/chainlink'

LogRocket.init(LOG_ROCKET_PROJECT_ID)

ReactGA.initialize('UA-217999792-1', {
  gaOptions: {
    cookieFlags: 'SameSite=None;Secure',
  },
})
hotjar.initialize(111111, 1)

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
}
TagManager.initialize(tagManagerArgs)

export const Root = () => {
  return (
    <div>
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
      </div>
  )
}

unregister()
