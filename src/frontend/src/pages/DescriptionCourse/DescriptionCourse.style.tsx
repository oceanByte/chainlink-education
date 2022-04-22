import styled from 'styled-components/macro'

import { grayscale1, grayscale2 } from 'styles'

export const ChapterH1 = styled.div`
  font-style: normal;
  font-weight: 900;
  color: ${grayscale1};

  @media (max-width: 1023px) {
    font-size: 26px;
    line-height: 31px;
  }

  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 29px;
  }

  @media (min-width: 1600px) {
    font-size: 40px;
    line-height: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
    line-height: 38px;
  }
`

export const RegularP = styled.p`
  font-style: normal;
  font-weight: 450;
  color: ${grayscale2};
  margin-top: 10px;

  > p {
    margin-bottom: 0;
  }

  p + p {
    margin: 0;
  }
  
  @media (max-width: 1023px) {
    font-size: 18px;
    line-height: 27px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 24px;
  }

  @media (min-width: 1600px) {
    font-size: 22px;
    line-height: 33px;
  }

  @media (min-width: 1024px) {
    font-size: 22px;
    line-height: 33px;
  }
  
`

export const GradientTextWrapper = styled.div`
  background: linear-gradient(55.74deg, #0EA6E8 1.98%, #0F3BCC 86.84%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: normal;
  font-weight: 900;
  margin-top: 20px;

  @media (max-width: 1023px) {
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 19px;
  }

  @media (min-width: 1600px) {
    font-size: 24px;
    line-height: 29px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    line-height: 24px; 
  }
`