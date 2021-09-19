import * as React from 'react'

//prettier-ignore
import { AboutContainer, AboutPage, AboutStyled, ButtonContainer } from './About.style'

export const AboutView = () => {
  return (
    <AboutStyled>
      <AboutPage>
        <AboutContainer>
          <h1>Chainlink Academy</h1>
          <p>Lorem Ipsum</p>
        </AboutContainer>
      </AboutPage>
    </AboutStyled>
  )
}
