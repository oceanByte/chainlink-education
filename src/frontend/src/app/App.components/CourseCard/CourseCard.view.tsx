import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'

import { course as ChainlinkIntroduction } from '../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../pages/Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../../../pages/Courses/vrfIntroduction'

import { chapterData as ChainlinkIntroductionChapters } from '../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../../../pages/Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../../../pages/Courses/vrfIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'
import { Course } from 'shared/course'
import { CourseNameType } from 'pages/Course/Course.data'

interface ICourseView {
  course: Course
  user?: PublicUser
  activeCourse: Option
}

export const CourseCardView = ({ course, user, activeCourse }: ICourseView) => {
  const [percent, setPercent] = useState(0)
  const [url, setUrl] = useState('/')

  const getUrl = (progress: number, path: string, countChapter: number) => {
    if (progress === 0 || progress === countChapter) {
      setUrl(() => `/${path}/chapter-1`)
      return
    }

    setUrl(() => `/${path}/chapter-${progress + 1}`)
  }

  useEffect(() => {
    const courseProgress = (course && course.progress.length) || 0

    if (course && course.title === CourseNameType.CHAINLINK_101) {
      getUrl(courseProgress, ChainlinkIntroduction.path, ChainlinkIntroductionChapters.length)
      setPercent(() => Math.floor((courseProgress / ChainlinkIntroductionChapters.length) * 100))
    } else if (course && course.title === CourseNameType.SOLIDITY_INTRO) {
      getUrl(courseProgress, SolidityIntroduction.path, SolidityIntroductionChapters.length)
      setPercent(() => Math.floor((courseProgress / SolidityIntroductionChapters.length) * 100))
    } else {
      getUrl(courseProgress, vrfIntroduction.path, SolidityIntroductionChapters.length)
      setPercent(() => Math.floor((courseProgress / vrfIntroductionChapters.length) * 100))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="course-line"></div>
      <div className="course-inner">
        <div className="course-status">
          <div className="course-status-text">{course.status}</div>
        </div>
        <div className="course-title">
          <div className="course-title-text">{course.title}</div>
          <div className="course-title-line" />
        </div>
        <div className="course-description">{course.description}</div>

        {user && (
          <div className="course-progress__bar">
            <div className="course-progress__bar__line">
              <div className="course-progress__bar__line__color" style={{ width: `${percent}%` }} />
              <div className="course-progress__bar__line__number" style={{ left: `${percent ? percent - 11 : 3}%` }}>
                {percent}%
              </div>
            </div>
          </div>
        )}
        <div className="course-difficulty">
          <div className="course-difficulty-content">
            <span>{course.difficulty}/5</span> <span>Difficulty</span>
          </div>
          {course.title !== 'Solidity Introduction' && (
            <div className="course-btn-wrapper">
              <Link
                to={url}
                className={classnames(
                  'btn course-btn',
                  !percent && 'new',
                  percent && percent !== 100 && 'continue',
                  percent && percent === 100 && 'completed',
                )}
              >
                {!percent ? <span className="btn__text">Start</span> : null}
                {percent && percent !== 100 ? <span className="btn__text">Continue</span> : null}
                {percent && percent === 100 ? <span className="btn__text">Repeat</span> : null}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
