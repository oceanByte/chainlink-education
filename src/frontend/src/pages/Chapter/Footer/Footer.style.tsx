import styled from 'styled-components/macro'
import { primaryColor, textColorWhite } from 'styles'

export const FooterStyled = styled.div`
  height: 70px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: space-between;
  }

  a {
    bottom: 20px;
    button {
      transform: scale(0.9);
      width: 200px;
    }
  }

  @media (max-width: 900px) {
    button {
      margin: 5px 0;
      height: 50px;
      width: 150px !important;
    }
  }
`
export const ProgressBarWrapper = styled.div`
  width: 100%;

  .course-progress__bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    .line {
      position: relative;
      width: 100%;
      height: 20px;
      background: silver;
      border-radius: 50px;
    }

    .completed {
      border-radius: 50px;
      height: 100%;
      background: ${primaryColor};
      transition: width 1s ease-in-out 0s;
    }

    .label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 15px;
      font-weight: bold;
      color: ${textColorWhite};
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`
export const LinkStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
