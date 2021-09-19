import styled from 'styled-components/macro'

import { FullPage } from 'styles'

export const ThankYouStyled = styled.div`
  position: relative;
  background: white;
  padding-bottom: 30px;

  > img {
    position: absolute;
    top: calc(33vh);
    left: 0;
    width: 100%;
    z-index: -1;
    opacity: 0.5;
  }
`

export const ThankYouPage = styled(FullPage)`
        padding: 100px 0px 0px 0px;
`

export const ThankYouContainer = styled.div`
  > h1 {
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }
  
  p {
     text-align: center;
  }
  
  a {
      margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  ul {
      width: max-content;
    margin: 30px auto;
    padding: 0;
  }

  > h2 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  > ul {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`
