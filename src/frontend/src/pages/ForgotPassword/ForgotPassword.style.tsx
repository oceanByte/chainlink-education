import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop } from '../../styles'
import { grayscale1 } from 'styles'

export const ForgotPasswordStyled = styled(CardPage)``

export const ForgotPasswordCard = styled(Card)`
  padding: 20px;
`
export const ForgotPasswordSeparator = styled.div`
  height: 10px;
`

export const Row = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${grayscale1};
  font-family: Circular Std Black;
`

export const ForgotPasswordTitle = styled(FadeInFromTop)``
