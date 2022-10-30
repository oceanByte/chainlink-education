import styled, { keyframes } from 'styled-components/macro'

import {
  backgroundColorLight,
  buttonColor,
  CIRCULAR_STD_BLACK,
  grayscale3,
  primary,
  secondary1,
  secondary3,
  secondary3Disabled,
  secondary3Hover,
  textColorBlue,
  textColorWhite,
} from '../../../styles'

import arrowUpRightWhite from '../../../assets/arrow-upright-white.svg'
import arrowUpRightBlue from '../../../assets/arrow-upright-blue.svg'
import arrowDownBlue from '../../../assets/arrow-down-blue.svg'
import arrowDownWhite from '../../../assets/arrow-down-white.svg'
import arrowLeft from '../../../assets/arrow_left.svg'
import arrowRight from '../../../assets/arrow_right.svg'
import arrowRightGreen from '../../../assets/arrow_rightGreen.svg'
import arrowLeftGreen from '../../../assets/arrow_leftGreen.svg'
import certificate from '../../../assets/certificate-icon.svg'

export const ButtonStyled = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
  height: 60px;
  font-family: ${CIRCULAR_STD_BLACK}, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  position: relative;
  padding-left: 25px;
  padding-right: 49px;

  @media (max-width: 767px) {
    height: 50px;
    font-size: 14px;
    line-height: 18px;
  }

  .arrow-upright,
  .arrow-down,
  .arrow-left,
  .arrow-right {
    height: 13px;
    width: 13px;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  &.isPrimary {
    color: ${textColorWhite};
    background: ${secondary3};
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);

    .arrow-upright {
      background: url(${arrowUpRightWhite}) no-repeat;

      @media screen and (max-width: 576px) {
        width: 10px;
        height: 10px;
        background-size: contain;
      }
    }

    &.isCompleted {
      .arrow-down {
        height: 24px;
        width: 24px;
        top: 16px;
        right: 16px;
        background: url(${arrowDownWhite}) no-repeat;

        @media (max-width: 767px) {
          top: 12px;
        }
      }

      .nft-right {
        height: 32px;
        width: 32px;
        top: 15px;
        position: absolute;
        right: 13px;
        background: url(${certificate}) no-repeat;

        @media (max-width: 767px) {
          top: 12px;
        }
      }
    }

    &:not(:disabled):hover {
      background: ${secondary3Hover};
    }

    &:disabled {
      cursor: default;
      background: ${secondary3Disabled};
    }
  }

  &.isSecondary {
    border: 1px solid ${secondary1};
    background: ${backgroundColorLight};
    color: ${textColorBlue};
    transition: all 0.2s ease-in-out;

    &:not(:disabled):hover {
      border: 1px solid ${primary};
    }

    .arrow-upright {
      background: url(${arrowUpRightBlue}) no-repeat;

      @media screen and (max-width: 576px) {
        width: 10px;
        height: 10px;
        background-size: contain;
      }
    }

    &.hasHome {
      width: 100%;
    }

    &.isCompleted {
      .arrow-down {
        height: 24px;
        width: 24px;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        background: url(${arrowDownBlue}) no-repeat;
        transition: all 0.2s ease-in-out;

        @media screen and (max-width: 576px) {
          width: 18px;
          height: 18px;
          background-size: contain;
        }
      }

      &.hasArrowUp {
        .arrow-down {
          transform: translateY(-50%) rotate(180deg);
          transition: all 0.2s ease-in-out;

          @media screen and (max-width: 576px) {
            width: 18px;
            height: 18px;
            background-size: contain;
          }
        }
      }
    }
  }

  &.isChapter {
    border: 1px solid ${grayscale3};
    background: ${backgroundColorLight};
    color: ${textColorBlue};
    transition: all 0.2s ease-in-out;
    height: 54px;

    &:not(:disabled):hover {
      border: 1px solid ${secondary3};

      .arrow-left {
        transition-delay: 0.1s;
        transition: all 0.2s ease-in-out;
        background: url(${arrowLeftGreen}) no-repeat;
      }
      .arrow-right {
        transition-delay: 0.1s;
        transition: all 0.2s ease-in-out;
        background: url(${arrowRightGreen}) no-repeat;
      }
    }

    &.hasArrowLeft {
      padding-left: 59px;
      padding-right: 25px;
    }

    &.hasArrowRight {
      padding-right: 59px;
      padding-left: 25px;
    }

    .arrow-left,
    .arrow-right {
      top: 50%;
      transform: translateY(-50%);
    }

    .arrow-left {
      left: 30px;
      background: url(${arrowLeft}) no-repeat;
    }
    .arrow-right {
      right: 30px;
      background: url(${arrowRight}) no-repeat;
    }

    @media screen and (max-width: 1284px) {
      width: auto !important;
      &.hasArrowLeft {
        padding-left: 40px;
        padding-right: 15px;
      }

      &.hasArrowRight {
        padding-right: 40px;
        padding-left: 15px;
      }

      .arrow-left {
        left: 20px;
      }
      .arrow-right {
        right: 20px;
      }
    }
  }

  &.transparent {
    color: ${buttonColor};
    background-color: initial;
  }

  &.loading {
    pointer-events: none;
    opacity: 0.8;
  }
`

export const ButtonText = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 36px;
`

const turn = keyframes`
  100% {
      transform: rotate(360deg);
  }
`

const path = keyframes`
  100% {
      stroke-dashoffset: 0;
  }
`

export const ButtonLoadingIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-left: 15px;
  vertical-align: sub;
  stroke: ${buttonColor};
  stroke-width: 1px;
  stroke-dashoffset: 94.248;
  stroke-dasharray: 47.124;
  animation: ${turn} 1.6s linear infinite forwards, ${path} 1.6s linear infinite forwards;
`
