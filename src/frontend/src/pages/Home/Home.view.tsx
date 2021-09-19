import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import * as React from 'react'

//prettier-ignore
import { HomePage, HomeStyled } from './Home.style'

export const HomeView = () => {
  return (
    <HomeStyled>
      <HomePage>
      </HomePage>
      <MainFooter />
    </HomeStyled>
  )
}
