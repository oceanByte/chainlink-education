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
  
  @media (max-width: 1024px) {
    margin-top: 20px;
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
  margin-top: 10px;
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 120%;
  color: #0C162C;

  @media (max-width: 760px) {
    font-size: 20px;
  }
`

export const ChapterH2 = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 120%;
  color: #0C162C;

  @media (max-width: 760px) {
    font-size: 16px;
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

export const ChapterH5 = styled.div`
  font-style: normal;
  font-weight: 450;
  font-size: 15px;
  line-height: 19px;
  color: #1A2B6B;
  margin: 0;
`

export const ChapterValidator = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(12, 22, 44, 0.1);
  border-radius: 20px;
  border: 1px solid white;
  position: relative;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 10px;
  min-height: 180px;
  
  .step {
    background: #05C46B;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 25px;
    position: absolute;
    top: 0;
    left: 40px;
    display: block;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 1024px) {
      left: 20px;
    }
    
    @media (max-width: 760px) {
      left: 15px;
    }

    &-text {
      font-family: Circular Std, sans-serif;
      font-style: normal;
      font-weight: 450;
      font-size: 15px;
      line-height: 19px;
      color: #FFFFFF;
      text-transform: uppercase;
      margin: 0 auto;
      padding: 3px 10px;
      display: flex;
    }
  }

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 760px) {
    padding: 40px 15px;
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
`;

export const LetsStart = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(12, 22, 44, 0.1);
  border-radius: 20px;
  border: 1px solid white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 40px 30px;
  min-height: 180px;
  
  .step {
    background: #05C46B;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 25px;
    position: absolute;
    top: 0;
    left: 40px;
    display: block;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 1024px) {
      left: 20px;
    }
    
    @media (max-width: 760px) {
      left: 15px;
    }

    &-text {
      font-family: Circular Std, sans-serif;
      font-style: normal;
      font-weight: 450;
      font-size: 15px;
      line-height: 19px;
      color: #FFFFFF;
      text-transform: uppercase;
      margin: 0 auto;
      padding: 3px 10px;
      display: flex;
    }
  }

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 760px) {
    padding: 40px 15px;
  }
`;

export const ChapterValidatorTitle = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  color: #0C162C;
  margin-bottom: 15px;
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  
  @media (max-width: 760px) {
    font-size: 16px;
  }
`

export const ChapterValidatorContent = styled.div`
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #3D4556;
  
   @media (max-width: 1024px) {
    font-size: 16px;
  }
  
  @media (max-width: 760px) {
    font-size: 14px;
  }
  
`

export const ChapterValidatorContentWrapper = styled.div`
    padding: 20px 30px;
    border-radius: 20px;
    width: 100%;
    min-height: 210px;
`

export const ChapterValidatorContentSuccess = styled.div`
    padding: 20px 30px;
    border-radius: 20px;
    background: rgba(5, 196, 107, 0.2);
    border: 2px solid rgba(5, 196, 107, 0.2);
    width: 100%;
    min-height: 210px;
`

export const ChapterValidatorContentFailed = styled.div`
    padding: 20px 30px;
    border-radius: 20px;
    background: rgba(255, 94, 87, 0.2);
    border: 2px solid rgba(255, 94, 87, 0.2);
    width: 100%;
    min-height: 210px;
`

export const ButtonStyle = styled.div`
  display: flex;
  font-size: 14px;
  width: 220px;
  height: 60px;
  background: #05C46B;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  margin: 30px auto 10px auto;
  transition: all 0.3s ease;

  img {
    position: absolute;  
    top: 16px;
    right: 16px;
    
    @media (max-width: 760px) {
      top: 10px;
      right: 8px;
      
      height: 10px;
    }
  }
  
  @media (max-width: 760px) {
    margin: 30px auto 10px 0;
    width: 170px;
  }

  &:hover {
    background: #018447;
    transition: all 0.3s ease;
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
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  line-height: 40px;
  z-index: 1;
  
  @media(max-width: 760px) {
    font-size: 16px;
    line-height: 18px;
  }

  > svg {
    stroke: ${textColor};
    width: 22px;
    height: 22px;
    margin-right: 17px;
    vertical-align: text-bottom;
  }
`

export const ContentWrapp = styled.div`
  margin: 40px 0;
  display: flex;
  /* align-items: center; */

  .imgContainer {
    margin-right: 21px;
  }
  .itemsContainer {
    max-width: 550px;
    .item-text {
      position: relative;
      font-style: normal;
      font-weight: 450;
      font-size: 16px;
      line-height: 150%;
      color: #3D4556;
      background-color: #DFE7FB;
      border-radius: 10px;
      padding: 20px;

      &::before {
        content: '';
        position: absolute;
        top: 30px;
        left: -25px;
        width: 0;
        height: 0;
        border-right: 35px solid #DFE7FB;
        border-top: 20px solid transparent;
        transform: rotate(-30.56deg);
      }

      & + .item-text {
        margin-top: 20px;
      }
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`
export const ListItemsContainer = styled.div`
  .list__items {
    .list__item {
      font-size: inherit;
      color: inherit;
      line-height: inherit;
    }
  }
`

export const MissionContainer = styled.div`
  background-color: #1a2b6b;
  box-shadow: 0 4px 15px rgba(12, 22, 44, 0.1);
  border-radius: 20px;
  padding: 40px;
  margin-top: 80px;
  margin-bottom: 80px;

  .title {
    font-weight: 900;
    font-size: 32px;
    line-height: 120%;
    color: #ffffff;
    margin: 0 0 20px 0;
  }

  .mission-goals {
    padding-left: 20px;
    margin: 0;

    & + .title {
      margin-top: 20px;
    }

    li {
      font-style: normal;
      font-weight: 450;
      font-size: 18px;
      line-height: 150%;
      color: #ffffff;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      .major-info {
        color: #eb4133;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 60px 30px;

    .title {
      font-size: 28px;
    }
  }

  @media screen and (max-width: 760px) {
    padding: 40px 15px;
  }
`

export const ChapterMonaco = styled.div``

export const ChapterBig = styled.em`
  font-style: normal;
  font-weight: 450;
  font-size: 22px;
  line-height: 150%;
  color: #0C162C;
  margin-bottom: 10px;
  
  @media (max-width: 760px) {
    font-size: 16px;
  }
`
export const RegularP = styled.p`
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 150%;
  color: #3D4556;
  margin-top: 20px;

  > p {
    margin-bottom: 0;
  }

  p + p {
    margin: 0;
  }
  
  @media (max-width: 760px) {
    font-size: 14px;
  }
  
  img {
    width: 100%;
  }
`

export const BlueParagraph = styled.p`
    color: #0EA6E8;
    font-style: normal;
    font-weight: 450;
    font-size: 22px;
    line-height: 150%;
    
    @media (max-width: 760px) {
      font-size: 16px;
    }
`

export const ColorWord = styled.span`
  color: #0EA6E8;
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

export const VideoBox = styled.div`
position: relative;
overflow: hidden;
width: 100%;
padding-top: 64%;

    iframe{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
`
