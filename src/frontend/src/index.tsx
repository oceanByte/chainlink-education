import * as React from 'react'
import ReactGA from 'react-ga'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
// @ts-ignore
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './app/App.controller'
import { configureStore } from './app/App.store'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import './styles/fonts.css'

import './styles/main.scss'

export const store = configureStore({})

ReactGA.initialize('UA-217999792-1')

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
}
TagManager.initialize(tagManagerArgs)

export const Root = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} language="en">
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GoogleReCaptchaProvider>
  )
}

unregister()
