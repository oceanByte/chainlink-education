import styled from 'styled-components/macro'

import { bgTextColor, primaryColor, textColor } from 'styles'

export const HeaderStyled = styled.div`
  /* position: relative;
  text-align: center;
  height: 70px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: green; */
`

export const HeaderLogo = styled.img`
  /* padding: 0px;
  z-index: 1;
  margin: auto;
  @media (max-width: 450px) {
    max-width: 200px;
  } */
`

export const HeaderLoggedOut = styled.div`
  /* position: absolute;
  top: 50%;
  right: 10px;
  display: flex;
  transform: translate(0, -50%);
  // grid-template-columns: auto auto auto auto;
  // grid-gap: 10px;

  @media (max-width: 1130px) {
    display: none;
  }

  .get-started {
    display: flex;
    align-items: center;

    button {
      width: max-content;
      height: 35px;
      padding: 0px 15px;
      font-size: 14px;
    }
  } */
`

export const HeaderLoggedIn = styled.div`
  /* position: absolute;
  top: 50%;
  right: 0;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  text-transform: uppercase;
  transform: translate(0, -50%);

  @media (max-width: 1130px) {
    display: none;
  } */
`

export const HeaderMenuItem = styled.div`
  /* position: relative;
  color: ${textColor};
  line-height: 50px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  padding: 0 20px;

  &.login {
    background-color: ${primaryColor};
    color: ${bgTextColor};
    width: 128px;
    display: grid;
    grid-template-columns: auto 50px;
    text-align: right;

    > div {
      line-height: 50px;
    }

    > svg {
      height: 28px;
      width: 28px;
      margin: 11px;
      stroke: ${bgTextColor};
    } */
  }

  @media (max-width: 1440px) {
    /* padding: 0 10px; */
  }
`
