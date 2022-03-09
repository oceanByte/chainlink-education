import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { chapterData } from '../../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../../Select/Select.view'
import { ChaptersListView } from 'app/App.components/ChaptersList/ChaptersListView'
import { Course } from 'shared/course'


interface ICourseView{
  course: Course,
  user?: PublicUser,
  activeCourse: Option,
}

export const CourseView = ({
  course,
  user,
  activeCourse
}: ICourseView) => {
  const [percent, setPercent] = useState(0);
  const { pathname } = useLocation()

  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {

      if (i !== 7){
        setPercent(() => ((i + 1) / chapterData.length) * 100)
      }
      else setPercent(() => 100)
    }
  })

  useEffect(() => {
    if (user && user.progress) {
      const userProgress = user && user.progress.length;
      setPercent(() => Math.floor((userProgress / chapterData.length) * 100))
    }
  }, [user])

  return (
    <>
      <div className='profile-page-section__header h-font'>Progress {course.title}</div>

      <div className='profile-page-progress__bar'>
        <div className='profile-page-progress__bar__line'>
          <div className='profile-page-progress__bar__line__color' style={{ width: `${percent}%` }} />
        </div>
        <div className='profile-page-progress__bar__number'>{percent}%</div>
      </div>
      <div className='profile-page-progress-chapters p-font'>
        <ChaptersListView
          user={user}
          activeCourse={activeCourse}
          pathname={pathname}
        />
      </div>
      {course.title === 'Ocean 101' ? (
        <>
          <div className='profile-page-progress__certificate-header h-font'>
            Certificate
          </div>
          <div className='profile-page-progress__warning'>You cannot upload the certificate yet because you have
            not completed the course
          </div>
          <div className='profile-page-progress-footer-box p-font'>
            <button className='profile-page-progress-footer-box__button btn btn-green btn-green-disabled'>
              <span className='profile-page-progress-footer-box__button__text'> Download certificate </span>
              <span className='arrow-upright' />
            </button>
            <div className='profile-page-progress-footer-box__copy-link'>
              Copy certificate link
            </div>
          </div>
          <div className='profile-page-progress__image' />
          </>
        ): null}
    </>
  )
}