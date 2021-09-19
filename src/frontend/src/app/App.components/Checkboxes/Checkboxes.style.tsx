import styled from 'styled-components/macro'

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
      border: 3px solid blue;
      margin-right: 0.5em;
    }

    > input:checked + span:before {
      border-color: blue;
      background-image: radial-gradient(circle closest-side, transparent 50%, transparent 100%);
    }

    > input:disabled + span {
      opacity: 0.5;
    }

    > input:disabled:checked + span:before {
      background-image: radial-gradient(
        circle closest-side,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        transparent 50%,
        transparent 100%
      );
    }

    > input {
      display: none;
    }
  }
`
