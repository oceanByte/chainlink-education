import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop } from '../../styles'

export const SignUpStyled = styled(CardPage)`
  height: 90vh;
`

export const SignUpCard = styled(Card)`
  text-align: center;
  padding: 20px;
`
export const SignUpSeparator = styled.div`
  height: 10px;
`

export const SignUpTitle = styled(FadeInFromTop)`
  text-align: center;
  color: white;
`

export const SignUpLogin = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  > a {
    color: white !important;
  }
`
