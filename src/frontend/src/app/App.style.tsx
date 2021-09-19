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
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  background: linear-gradient(236.29deg, #1174cb 3.4%, #20c1dc 100%);

  @media (max-width: 992px) {
    background: transparent;
  }
`
