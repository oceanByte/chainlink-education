import styled from 'styled-components/macro'
import { backgroundColorLight, grayscale3, primary } from 'styles'

export const DifficultyStyled = styled.div`
  width: 70px;
  height: 34px;
  background: ${backgroundColorLight};
  border: 1px solid ${grayscale3};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1160px) {
    height: 26px;
  }

  .difficulty-items {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
  }

  .difficulty-item {
    width: 6px;
    height: 6px;
    border: 1px solid ${primary};
    border-radius: 50%;

    &.isFilled {
      background:${primary};
    }
  }
`
