import styled from 'styled-components/macro'

import { borderColor, grayscale1, secondary3 } from 'styles'

export const Label = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  font-family: Circular Std Black;
  line-height: 25px;
  color: ${grayscale1};

  &.disabled {
    color: rgba(255,255,255, .3);
  }

`

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  border: 1px solid ${borderColor};
  background: none;
  font-size: 16px;
  line-height: 20px;
  padding: 10px;
  color: ${grayscale1};
  font-family: Circular Std Book;

  &.success {
    border: 1px solid ${secondary3};
    input {
      color: ${grayscale1};
    }

  }
  &.error {
    background-color: #FECDD3;
    border: 1px solid #DC2626;
    input {
      color: ${grayscale1};
    }
  }

  &.disabled {
    background-color: #13274C;
  }
`
export const InvalidBox = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin-top: 6px;
  color: #F87171;
  
  &:first-letter {
    text-transform: uppercase;
  }
`
