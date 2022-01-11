import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop } from '../../styles'
import { grayscale1 } from 'styles'

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

export const Row = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${grayscale1};
  font-family: Circular Std Black;
`

export const CheckboxWrapp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Circular Std Black;

  .sign-up__checkbox{
    align-self: flex-start;
    display: flex;
    margin-top: 20px;
    cursor: pointer;
    user-select: none;

    input {
      display: none;
    }

    &-label {
      display: block;
      width: 37px;
      height: 20px;
      border: 1px solid black;
      box-sizing: border-box;
    }

    &-checked {
      border: 6px solid #05c46b;
      width: 30px;
    }

    &-text {
      margin-left: 10px;
      font-family: Circular Std Book;
      color: $grayscale2;
      font-size: 14px;
    }
  }
`

export const ErrorMessage = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin-top: 6px;
  color: #F87171;
  
  &:first-letter {
    text-transform: uppercase;
  }
`

export const SignUpLogin = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  > a {
    color: white !important;
  }
`
