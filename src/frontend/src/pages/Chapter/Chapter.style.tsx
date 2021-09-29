import styled from 'styled-components/macro'

import { backgroundColorLight, downColor, okColor, primaryColor, textColor } from 'styles'

export const ChapterStyled = styled.div`
  background: linear-gradient(236.29deg, #1174cb 3.4%, #20c1dc 100%);
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 20px;
  height: calc(100vh - 170px);
  margin: 80px 20px 0;

  .images {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 40%;
    min-width: 40%;
    height: 100%;
    overflow: hidden;

    @media (max-width: 992px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
    height: initial;
    margin: 70px 10px 0;
  }
`

export const ChapterGrid = styled.div<{ hasTabs?: boolean }>`
  // display: grid;
  // grid-template-rows: ${(props) => (props.hasTabs ? '30px auto auto' : 'auto auto')};
  // grid-gap: 0;
  // height: calc(100vh - 170px);
  /* overflow-y: scroll; */

  @media (max-width: 900px) {
    height: auto;
    overflow-y: initial;
    margin-bottom: 20px;
  }
`

export const ChapterQuestions = styled.div`
  padding: 20px;
  border: 1px solid blue;
  background: white;
  h2 {
    font-weight: 600;
  }
`

export const ChapterCourse = styled.div`
  background: ${backgroundColorLight};
  border: 1px solid blue;
  padding: 20px;
  font-size: 14px;
  white-space: pre-wrap;
  overflow: auto;
  position: relative;
  font-size: 22px;
  color: black;

  code {
    font-size: 14.5px;

    &.hljs {
      padding: 10px;
      margin: 0px 40px;

      @media (max-width: 680px) {
        margin: 0px;
      }

      a {
        color: #fff;
      }
    }

    p {
      padding: 0;
      margin: 0;
      font-size: 14.5px;
    }

    span {
      font-size: 14.5px;
      font-weight: normal;
    }
  }

  .view-line {
    font-size: 18px;
    /* text-align: right; */
    padding: 0 40px;
  }

  p {
    padding: 0 40px;
    font-size: 19px;
    font-weight: 300;
    text-align: left;
  }
  @media (max-width: 680px) {
    padding: 10px;
    p {
      padding: 0 10px;
      font-size: 16px;
    }
  }
  @media (min-width: 1024px) {
    p {
      padding: 0 40px;
      font-size: 19px;
      font-weight: 300;
      text-align: justify;
    }
  }

  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }

  @media (min-width: 500px) {
    .chapterImage {
      max-width: 450px;
    }
  }

  strong {
    color: #001424;
    font-weight: bold;
  }

  a:visited {
    color: #002746;
    text-decoration: underline #001424 !important;
  }

  a {
    color: #001424;
    text-decoration: underline !important;
  }

  ul {
    font-size: 19px;
    padding-left: 60px;
    font-weight: 300;
  }
`

export const ChapterH1 = styled.div`
  font-size: 50px;
  margin-top: 25px;
  color: #1174cb;
  line-height: 38px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 615px) {
    font-size: 35px;
  }
`

export const ChapterH2 = styled.div`
  color: #0072ce;
  padding: 20px 40px 10px 40px;
  font-weight: 900;
  font-size: 28px;
  text-align: left;

  @media (max-width: 615px) {
    font-size: 26px;
    padding: 10px;
  }
`

export const ChapterH3 = styled.div`
  font-size: 24px;
  line-height: 28px;
  margin-top: 20px;
`
export const ChapterH4 = styled.div`
  font-size: 15px;
  line-height: 28px;
  margin: 0;
`

export const ChapterValidator = styled.div`
  background: white;
  border: 1px solid white;
  position: relative;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0 10px;
  min-height: 180px;

  @media (max-width: 900px) {
    padding: 45px 10px;
  }

  &.ok {
    border-color: ${okColor};
  }

  .tryagain {
    color: ${downColor};
    animation: redtowhite 2s forwards;
  }

  @keyframes redtowhite {
    from {
      color: ${downColor};
    }
    to {
      color: ${textColor};
    }
  }
`

export const ChapterValidatorTitle = styled.div`
  font-size: 32px;
  color: #0072ce;
  font-weight: 600;
`

export const ChapterValidatorContent = styled.div`
  font-size: 12px;
  color: #000;
`

export const ChapterValidatorContentWrapper = styled.div``

export const ButtonStyle = styled.div`
  font-size: 14px;
  width: 220px;
  height: 40px;
  // border: 1px solid white;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 20px auto 10px auto;

  img {
    display: inline-block;
    margin: 10px 20px 10px -10px;
    vertical-align: bottom;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 40px;

  button {
    height: 36px;
    max-width: 170px;
    margin: 0px 0px 0px 30px;
  }
`

export const ButtonBorder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border: 1px solid transparent;
  border-image-source: url('/elements/button-border.svg');
  border-image-slice: 24 28 fill;
  border-image-width: 100px;
  content: '';
  z-index: 0;
`

export const ButtonText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 40px;
  z-index: 1;
  color: ${textColor};
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 55px;
  font-weight: 600;
  &:hover {
    transform: scale(1.05);
    color: #0072ce;
  }

  > svg {
    stroke: ${textColor};
    width: 22px;
    height: 22px;
    margin-right: 17px;
    vertical-align: text-bottom;
  }
`

export const ChapterMonaco = styled.div``

export const ChapterItalic = styled.em`
  font-style: italic;
`

export const ChapterTab = styled.div<{ isSelected?: boolean }>`
  height: 30px;
  line-height: 20px;
  margin-right: 10px;
  padding: 5px 10px;
  display: inline-block;
  cursor: pointer;
  border-top: 1px solid ${primaryColor};
  border-right: 1px solid ${primaryColor};
  border-left: 1px solid ${primaryColor};
  background-color: ${(props) => (props.isSelected ? '${primaryColor}' : 'initial')};
`

export const ChapterLocked = styled.div`
  height: calc(100vh - 130px);
  margin: 70px 20px 0;
`

export const Difficulty = styled.div`
  margin: 15px 0px;
  text-align: center;
`
export const BackgroundContainer = styled.div`
  background-color: #0072ce;
  color: white;
  // padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .top-line {
    position: absolute;
    width: 100%;
    height: 25px;
    background: #fff;
    top: 0;

    @media (max-width: 992px) {
      display: none;
    }
  }

  .bottom-line {
    position: absolute;
    width: 100%;
    height: 22px;
    background: #fff;
    bottom: 0;

    @media (max-width: 992px) {
      display: none;
    }
  }

  p {
    font-size: 17px;
  }

  img {
    max-width: 40%;
    width: 40%;
    @media (max-width: 992px) {
      max-width: 100%;
      width: 100%;
    }
  }

  h1 {
    color: #ffb359;
  }

  @media (max-width: 1800px) {
    padding: 10px 0;
  }

  @media (max-width: 992px) {
    flex-direction: column;
  }
`
export const ImageContainer = styled.span`
  display: block;
  margin-top: 40px;
`

export const Spacer = styled.span`
  display: block;
  height: 30px;
`

export const narrativeText = styled.div`
  display: flex;
  align-items: center;
  height: 400px;
  font-weight: 400;
  font-size: 18px;
  color: #f2f2f2;
  overflow: hidden;

  img {
    display: none;
  }

  @media (min-width: 800px) {
    img {
      display: block;
    }
  }

  @media (max-width: 992px) {
    flex-direction: column;
  }

  .image-wrapper {
    display: flex;
    align-items: flex-end;
    width: 30%;
    min-width: 30%;
    margin: 0px 40px 0px 15px;

    @media (max-width: 992px) {
      width: 100%;
    }
  }
`

export const TextWrapper = styled.div`
  padding: 5%;
`

export const Quote = styled.div`
  color: #0072ce;
  font-size: 35px;
  font-weight: 900;
  padding-left: 40px;
`

export const quoteComma = styled.div`
  color: #0072ce;
  font-weight: 600;
  font-size: 88px;
  margin-bottom: -80px;
`

export const VerticalAlign = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;

  @media (max-width: 992px) {
    width: 100%;
  }
`

export const SpecialCode = styled.div`
  animation: flow 6s ease-in-out infinite;
  background: linear-gradient(-60deg, #fff, #00c08b, #0072ce, #000);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 8px 40px;
  line-break: anywhere;

  @keyframes flow {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 0;
    }

    100% {
      background-position: 0 50%;
    }
  }
`
export const AnimatedCode = styled.div`
  animation: flow 10s ease-in-out infinite;
  background: linear-gradient(-60deg, #000, #00c08b, #0072ce, #000);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;

  @keyframes flow {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 0;
    }

    100% {
      background-position: 0 50%;
    }
  }
`
