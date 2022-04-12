import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view'
import { FooterStyled, ProgressBarWrapper, LinkStyled } from './Footer.style'

export const FooterView = ({ nextChapter, previousChapter, percent }: any) => {
  const { pathname } = useLocation()
  const history = useHistory()

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
        <MainButtonView
            isChapter
            hasArrowLeft
            text={pathname !== '/chainlinkIntroduction/chapter-1' ? 'Previous Chapter' : 'Home Page'}
            onClick={() => history.push(previousChapter)}
            loading={false}
            disabled={false}
          />
        <MainButtonView
            isChapter
            hasArrowRight
            text={pathname !== '/chainlinkIntroduction/chapter-8' ? 'Next Chapter' : 'Get certificate'}
            onClick={() => history.push(nextChapter)}
            loading={false}
            disabled={false}
          />
      </LinkStyled>
    </FooterStyled>
  )
}
