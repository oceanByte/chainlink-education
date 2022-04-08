import { Button } from 'app/App.components/Button/Button.controller'
import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { FooterStyled, ProgressBarWrapper, LinkStyled } from './Footer.style'

export const FooterView = ({ nextChapter, previousChapter, percent }: any) => {
  const { pathname } = useLocation()
  return (
    <FooterStyled>
      <ProgressBarWrapper>
        <div className="course-progress__bar">
          <div className="line">
            <div className="completed" style={{ width: `${percent}%` }} />
            <div className="label">
              {percent}%
            </div>
          </div>
        </div>
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
