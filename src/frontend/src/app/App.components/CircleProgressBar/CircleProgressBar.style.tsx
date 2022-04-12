import styled from 'styled-components/macro'
import { secondary2, textColorBlue } from 'styles'

interface CircleStyledProps {
  percentage: number;
}

export const CircleStyled = styled.svg<{ percentage?: number }>`
  .circle-background,
  .circle-progress {
    fill: none;
  }

  .circle-background {
    stroke: ${secondary2};
    stroke-width: 5px;
  }

  .circle-progress {
    stroke: url(#GradientColor);
    stroke-width: 5px;
  }

  .circle-text {
    text-align: center;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    fill: ${textColorBlue};
    width: 60px;
    z-index: 1;
  }
`
