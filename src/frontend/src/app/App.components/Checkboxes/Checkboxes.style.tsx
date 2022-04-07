import styled from 'styled-components/macro'
import { borderColorCheckbox, secondary3 } from 'styles'

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
      height: 1em;
      width: 1em;
      border-radius: 10%;
      border: 2px solid ${borderColorCheckbox};
      margin-right: 0.5em;
    }

    > input:checked + span:before {
      width: 0.5em;
      height: 0.5em;
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
