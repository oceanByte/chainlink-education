import styled from 'styled-components/macro'
import { secondary2, textColorBlue } from 'styles'

export const CircleStyled = styled.svg`
  width: 60px;
  height: 60px;

  &.isOverallProgress {
    width: 80px;
    height: 80px;
  }

  @media screen and (max-width: 576px) {
    width: 50px;
    height: 50px;
  }

  .circle-background,
  .circle-progress {
    fill: none;
  }

  .circle-background {
    stroke: ${secondary2};
  }

  .circle-progress {
    stroke: url(#GradientColor);
  }

  .circle-text {
    text-align: center;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    fill: ${textColorBlue};
    width: 60px;
    z-index: 1;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
    }

    @media screen and (max-width: 576px) {
      width: 50px;
      font-size: 14px;
      line-height: 17px;
    }
  }
`
