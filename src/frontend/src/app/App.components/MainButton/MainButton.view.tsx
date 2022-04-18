import * as PropTypes from 'prop-types'
import * as React from 'react'

import classnames from 'classnames';

import { ButtonTypes } from '../Button/Button.constants'
import { ButtonLoadingIcon, ButtonStyled, ButtonText } from './MainButton.style'

type MainButtonViewProps = {
  text: string
  onClick?: () => void
  type?: ButtonTypes
  className?: string
  loading: boolean
  disabled?: boolean
  isSecondary?: boolean
  isPrimary?: boolean
  isCompleted?: boolean
  isChapter?: boolean
  hasArrowUpRight?: boolean
  hasArrowRight?: boolean
  hasArrowLeft?: boolean
  hasArrowDown?: boolean
}

export const MainButtonView = ({
  text,
  disabled,
  className,
  onClick,
  type,
  loading,
  isSecondary,
  isPrimary,
  isCompleted,
  isChapter,
  hasArrowUpRight,
  hasArrowRight,
  hasArrowLeft,
  hasArrowDown,
}: MainButtonViewProps) => {
  return (
    <ButtonStyled
      className={classnames(
        isSecondary && 'isSecondary',
        isPrimary && 'isPrimary',
        isCompleted && 'isCompleted',
        isChapter && 'isChapter',
        hasArrowUpRight && 'hasArrowUpRight',
        hasArrowRight && 'hasArrowRight',
        hasArrowLeft && 'hasArrowLeft',
        hasArrowDown && 'hasArrowDown',
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {hasArrowLeft ? (<div className='arrow-left' />) : null}
      <ButtonText>
        {loading ? (
          <>
            Loading
            <ButtonLoadingIcon>
              <use xlinkHref="/icons/sprites.svg#circle" />
            </ButtonLoadingIcon>
          </>
        ) : (
          <>
            <span>{text}</span>
          </>
        )}
      </ButtonText>
      {hasArrowUpRight ? (<div className='arrow-upright' />) : null}
      {hasArrowDown ? (<div className='arrow-down' />) : null}
      {hasArrowRight ? (<div className='arrow-right' />) : null}
      
    </ButtonStyled>
  )
}

MainButtonView.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
}
