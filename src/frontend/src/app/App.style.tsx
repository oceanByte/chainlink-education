import styled from 'styled-components/macro'
import { backgroundColorDark } from 'styles'

export const AppStyled = styled.div`
  display: flex;
  justify-content: space-around;
`
export const AppBg = styled.div`
  min-height: 100vh;
  background-color: ${backgroundColorDark};
`

export const AppWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;

  @media screen and (max-width: 1400px){
    min-height: calc(100vh - 50px);
  }

  @media (max-width: 992px) {
    background: transparent;
  }
`
