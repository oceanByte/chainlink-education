import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop } from '../../styles'

export const LoginStyled = styled(CardPage)`
  height: 90vh;
`

export const LoginCard = styled(Card)`
  text-align: center;
  padding: 20px;
`
export const LoginSeparator = styled.div`
  height: 10px;
`

export const LoginTitle = styled(FadeInFromTop)`
  text-align: center;
  color: white;
`

export const LoginSignUp = styled.div`
  margin-top: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;

  > a {
    color: white !important;
  }
`
