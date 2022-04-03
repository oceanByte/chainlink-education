import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { course as ChainlinkIntroduction } from '../../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../../pages/Courses/solidityIntroduction'
import { course as VDFIntroduction } from '../../../../pages/Courses/vdfIntroduction'

import { chapterData as ChainlinkIntroductionChapters } from '../../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../../../../pages/Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as VDFIntroductionChapters } from '../../../../pages/Courses/vdfIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
// import { Option } from '../../Select/Select.view'
import { ChaptersListView } from 'app/App.components/ChaptersList/ChaptersListView'
import { Course } from 'shared/course'
import { CourseNameType } from 'pages/Course/Course.data'

interface ICourseView {
  course: Course
  user?: PublicUser
}

export const CourseView = ({ course, user }: ICourseView) => {
  const [percent, setPercent] = useState(0)
  const [coursePath, setActiveCoursePath] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    const courseProgress = course && course.progress.length
    if (course && course.title === CourseNameType.CHAINLINK_101) {
      setPercent(() => Math.floor((courseProgress / ChainlinkIntroductionChapters.length) * 100))
      setActiveCoursePath(() => ChainlinkIntroduction.path)
    } else if (course && course.title === CourseNameType.SOLIDITY_INTRO) {
      setPercent(() => Math.floor((courseProgress / SolidityIntroductionChapters.length) * 100))
      setActiveCoursePath(() => SolidityIntroduction.path)
    } else {
      setPercent(() => Math.floor((courseProgress / VDFIntroductionChapters.length) * 100))
      setActiveCoursePath(() => VDFIntroduction.path)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="profile-page-section__header h-font">Progress {course.title}</div>

      <div className="profile-page-progress__bar">
        <div className="profile-page-progress__bar__line">
          <div className="profile-page-progress__bar__line__color" style={{ width: `${percent}%` }} />
        </div>
        <div className="profile-page-progress__bar__number">{percent}%</div>
      </div>
      <div className="profile-page-progress-chapters p-font">
        <ChaptersListView user={user} coursePath={coursePath} course={course} pathname={pathname} />
      </div>
      {course.title === CourseNameType.CHAINLINK_101 ? (
        <>
          <div className="profile-page-progress__certificate-header h-font">Certificate</div>
          <div className="profile-page-progress__warning">
            You cannot upload the certificate yet because you have not completed the course
          </div>
          <div className="profile-page-progress-footer-box p-font">
            <button className="profile-page-progress-footer-box__button btn btn-green btn-green-disabled">
              <span className="profile-page-progress-footer-box__button__text"> Download certificate </span>
              <span className="arrow-upright" />
            </button>
            <div className="profile-page-progress-footer-box__copy-link">Copy certificate link</div>
          </div>
          <div className="profile-page-progress__image" />
        </>
      ) : null}
    </>
  )
}
