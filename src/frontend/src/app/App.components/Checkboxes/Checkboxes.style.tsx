import styled from 'styled-components/macro'
import { grayscale3, secondary3 } from 'styles'

export const CheckboxesStyled = styled.div`
  padding: 1em;

  label {
    display: block;
    padding: 0.5em;
    cursor: pointer;

    > span:before {
      content: '';
      display: inline-block;
      vertical-align: -0.25em;
      height: 20px;
      width: 20px;
      border-radius: 10%;
      border: 1px solid ${grayscale3};
      margin-right: 0.5em;
      box-sizing: border-box;
    }

    > input:checked + span:before {
      width: 20px;
      height: 20px;
      border: 6px solid ${secondary3};
    }

    > input:disabled + span {
      opacity: 0.5;
    }

    > input:disabled:checked + span:before {

    }

    > input {
      display: none;
    }
  }
`
