import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import classnames from 'classnames'

import { chapterData } from '../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'
import { Course } from 'shared/course'


interface ICourseView{
  course: Course,
  user?: PublicUser,
  activeCourse: Option,
}

export const CourseCardView = ({
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
      <div className='course-line'></div>
      <div className='course-inner'>
        <div className='course-status'>
          <div className='course-status-text'>{course.status}</div>
        </div>
        <div className='course-title'>
          <div className='course-title-text'>{course.title}</div>
          <div className='course-title-line' />
        </div>
        <div className='course-description'>{course.description}</div>

        <div className='course-progress__bar'>
          <div className='course-progress__bar__line'>
            <div className='course-progress__bar__line__color' style={{ width: `${percent}%` }} />
            <div className='course-progress__bar__line__number' style={{ left: `${percent ? percent - 11 : 3}%` }}>{percent}%</div>
          </div>
        </div>
        <div className='course-difficulty'>
          <div className='course-difficulty-content'>
            <span>{course.difficulty}/5</span>{' '}<span>Difficulty</span>
          </div>
          <div className='course-btn-wrapper'>
            <button className={classnames(
              'btn course-btn', 
              !percent && 'new',
              percent && percent !== 100 && 'continue',  
              percent && percent === 100 && 'completed'  
            )}>
              {!percent ? (<span className="btn__text">Start your journey</span>): null}
              {percent && percent !== 100 ? (<span className="btn__text">Continue</span>): null}
              {percent && percent === 100 ? (<span className="btn__text">Repeat</span>): null}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}