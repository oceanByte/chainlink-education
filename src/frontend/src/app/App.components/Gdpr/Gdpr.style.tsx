import styled from 'styled-components/macro'

import { backgroundColorLight } from 'styles'

export const CenterStyled = styled.div`
 

  @media (max-width: 680px) {
    margin: auto;
    width: 50%;
    
    button {
      max-width: 150px;
      max-height: 80px;
      margin: 0;
      padding: 2px;
    }
  }

  @media (max-width: 400px) {
    button {
      max-width: 150px;
      height: 50px;
      padding: 0;
    }
  }
`

export const GdprStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-height: 270px;
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  grid-gap: 10px 10px;
  -webkit-box-shadow: 0px -2px 10px 5px rgba(0,0,0,0.2); 
  box-shadow: 0px -2px 10px 5px rgba(0,0,0,0.2);

  background-color: ${backgroundColorLight};
  padding: 5px 20px;

  p {
    font-size: 17px;
  }
 
  @media (max-width: 1080px) {
    button {
      max-width: 150px;
      max-height: 80px;
    }
  }

  @media (max-width: 1024px) {
    p {
      font-size: 12px;
    }
  }

  @media (max-width: 680px) {
    grid-template-rows: 5fr 1fr fr;
    grid-template-columns: none; 

    button {
      max-width: 150px;
      max-height: 80px;
      margin: 0;
      padding: 2px;
    }
  }
`
