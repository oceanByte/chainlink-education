import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { Error404H1, Error404Message, Error404Styled, Error404Card } from './Error404.style'

import { MainButtonView } from 'app/App.components/MainButton/MainButton.view'

export const Error404View = () => {
  const history = useHistory()
  return (
    <Error404Styled>
      <Error404Card>
        <Error404H1>Error 404</Error404H1>
        <Error404Message>Page not found...</Error404Message>
        <MainButtonView
          isCompleted
          isSecondary
          hasHome
          loading={false}
          text='Go back home'
          onClick={() => history.push('/')}
        />
      </Error404Card>
    </Error404Styled>
  )
}
