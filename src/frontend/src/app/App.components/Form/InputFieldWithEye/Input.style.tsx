import styled from 'styled-components/macro'

import { grayscale1, grayscale3, secondary3 } from 'styles'

export const InputWrapp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid ${grayscale3};
  transition: all .2s;

  .eyeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 10px;

    img {
      width: 22px;
      cursor: pointer;
    }
  }

  &.success {
    border: 1px solid ${secondary3};
    input {
      color: ${grayscale1};
    }

  }
  &.error {
    border-bottom: 1px solid #E8505B;
  }

  &.disabled {
    background-color: #13274C;
  }
`

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
  border-radius: inherit;
  background: none;
  font-size: 16px;
  line-height: 20px;
  padding: 10px;
  color: ${grayscale1};
  font-family: 'Circular Std', sans-serif;
`
export const InvalidBox = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  margin-top: 6px;
  color: #FF5E57;
  font-family: 'Circular Std', sans-serif;
  
  &:first-letter {
    text-transform: uppercase;
  }
`
