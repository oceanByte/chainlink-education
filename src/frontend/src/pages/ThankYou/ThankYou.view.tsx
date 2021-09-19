import * as React from 'react'
import {Link} from 'react-router-dom'
//prettier-ignore
import { ThankYouContainer, ThankYouPage, ThankYouStyled } from './ThankYou.style'
import {Button} from "../../app/App.components/Button/Button.controller";

export const ThankYouView = () => {
  return (
    <ThankYouStyled>
      <ThankYouPage>
        <ThankYouContainer>
          <h1>Thank you page</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad fugit magni mollitia quo quod ratione rem, repudiandae sapiente sed tempora.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad fugit magni mollitia quo quod ratione rem, repudiandae sapiente sed tempora.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad fugit magni mollitia quo quod ratione rem, repudiandae sapiente sed tempora.</p>
          <ul>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
          </ul>
          <Link to='/'>
            <Button text="Go to home" color="primary" icon="right-arrow" />
          </Link>
        </ThankYouContainer>
      </ThankYouPage>
    </ThankYouStyled>
  )
}
