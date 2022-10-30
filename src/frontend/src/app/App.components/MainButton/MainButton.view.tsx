import * as PropTypes from 'prop-types'
import * as React from 'react'

import classnames from 'classnames'

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
  hasHome?: boolean
  hasNftRight?: boolean
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
  hasHome,
  hasNftRight,
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
        hasHome && 'hasHome',
        hasNftRight && 'hasNft',
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {hasArrowLeft ? <div className="arrow-left" /> : null}
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
      {hasArrowUpRight ? <div className="arrow-upright" /> : null}
      {hasArrowDown ? <div className="arrow-down" /> : null}
      {hasArrowRight ? <div className="arrow-right" /> : null}
      {hasNftRight ? <div className="nft-right" /> : null}
    </ButtonStyled>
  )
}

MainButtonView.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
}
