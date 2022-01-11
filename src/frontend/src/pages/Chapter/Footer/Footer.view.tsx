import { Button } from 'app/App.components/Button/Button.controller'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import ProgressBar from '@ramonak/react-progress-bar'

import { Link } from 'react-router-dom'

import { FooterStyled, ProgressBarWrapper, LinkStyled } from './Footer.style'

export const FooterView = ({ nextChapter, previousChapter, percent }: any) => {
  const { pathname } = useLocation()
  return (
    <FooterStyled>
      <ProgressBarWrapper>
        <ProgressBar baseBgColor={'silver'} bgColor={'#00C08B'} completed={percent} />
      </ProgressBarWrapper>
      <LinkStyled>
        <Link to={previousChapter}>
          <Button
            text={pathname !== '/chainlinkIntroduction/chapter-1' ? 'Previous' : 'Go to Home'}
            color="primary"
            icon="left-arrow"
            invertIcon
          />
        </Link>
        <Link to={nextChapter}>
          <Button
            text={pathname !== '/chainlinkIntroduction/chapter-8' ? 'Next' : 'Get certificate'}
            color="primary"
            icon="right-arrow"
          />
        </Link>
      </LinkStyled>
    </FooterStyled>
  )
}
