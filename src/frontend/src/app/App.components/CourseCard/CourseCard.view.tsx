import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import classnames from 'classnames'

import { course as ChainlinkIntroduction } from '../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../pages/Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../../../pages/Courses/vrfIntroduction'

import { chapterData as ChainlinkIntroductionChapters } from '../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../../../pages/Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../../../pages/Courses/vrfIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'
import { CourseNameType, CourseStatusType } from 'pages/Course/Course.data'
import { MainButtonView } from '../MainButton/MainButton.view'
import { CircularProgressBar } from '../CircleProgressBar/CircleProgressBar.view'

const MAX_DIFFICULTY = 5;

interface ICourseView {
  course: Course
  user?: PublicUser
}

export const CourseCardView = ({ course, user }: ICourseView) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [data, setData] = useState({
    percent: 0,
    countChapters: 0,
    amountOfTime: ''
  })
  const [isShowList, setIsShowList] = useState(false);
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
      setData((prev) => ({
        ...prev,
        percent: Math.floor((courseProgress / ChainlinkIntroductionChapters.length) * 100),
        countChapters: ChainlinkIntroductionChapters.length,
        amountOfTime: ChainlinkIntroduction.amountOfTime
      }))
    } else if (course && course.title === CourseNameType.SOLIDITY_INTRO) {
      getUrl(courseProgress, SolidityIntroduction.path, SolidityIntroductionChapters.length)
      setData((prev) => ({
        ...prev,
        percent: Math.floor((courseProgress / SolidityIntroductionChapters.length) * 100),
        countChapters: SolidityIntroductionChapters.length,
        amountOfTime: SolidityIntroduction.amountOfTime
      }))
    } else if (course && course.title === CourseNameType.VRF_V2) {
      getUrl(courseProgress, vrfIntroduction.path, vrfIntroductionChapters.length)
      setData((prev) => ({
        ...prev,
        percent: Math.floor((courseProgress / vrfIntroductionChapters.length) * 100),
        countChapters: vrfIntroductionChapters.length,
        amountOfTime: vrfIntroduction.amountOfTime
      }))
    }
    // eslint-disable-next-line
  }, [])

  const showList = () => {
    setIsShowList((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowList(() => false);
      }
    }
    if (isShowList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowList]);

  return (
    <>
      <div className="course-inner">
        <div className='course-inner__header'>
          <div className='course-inner__logo-container'>
            <div className={classnames(
              'course-inner__logo', 
              course.status === CourseStatusType.COMPLETED && 'completed'
            )} />
          </div>
          <div className='course-inner__difficulty'>
            <div className='course-inner__difficulty-items'>
              {new Array(MAX_DIFFICULTY)
                .fill('')
                .map((_, index) => (
                  <div className={classnames('course-inner__difficulty-item', index + 1 <= course.difficulty && 'isFilled')} />
                ))}
            </div>
          </div>
        </div>
        

        <div className='course-inner__container'>
          <div className='course-inner__top'>
            <div className="course-title h-font">
              {course.title}
            </div>
            <div className='course-additional-info'>
              <div className='course-additional-info__chapters item'>
                <div className='icon'/><div>{data.countChapters} chapters</div>
              </div>
              <div className='course-additional-info__time item'>
                <div className='icon'/><div>{data.amountOfTime}</div>
              </div>
            </div>
            <div className="course-description">{course.description}</div>
          </div>
          
          <div className='course-footer'>
            <div className="course-btn-wrapper">
              {!data.percent ? <MainButtonView
                  isPrimary
                  hasArrowUpRight
                  text='View Course'
                  onClick={() => history.push(url)}
                  loading={false}
                  disabled={false}
                /> : null}
              {data.percent && data.percent !== 100 ? <MainButtonView
                  isSecondary
                  hasArrowUpRight
                  text='Continue'
                  onClick={() => history.push(url)}
                  loading={false}
                  disabled={false}
                /> : null}
              {data.percent && data.percent === 100 ? <MainButtonView
                  isCompleted
                  isSecondary
                  hasArrowDown
                  text='Download certificate'
                  onClick={() => history.push(url)}
                  loading={false}
                  disabled={false}
                /> : null}
            </div>
            {user && data.percent && data.percent !== 100 ? (
              <div className="course-footer__progress-bar">
                <div className="circle-wrap">
                  <CircularProgressBar
                    strokeWidth="5"
                    sqSize="60"
                    percentage={data.percent}/>
                </div>
                </div>
            ): null}

            {user && data.percent && data.percent === 100 ? (
              <div ref={wrapperRef} className="course-footer__share">
                <button className='course-footer__share-btn' onClick={showList} />
                <div className={classnames('course-footer__share-list', isShowList && 'show')}>
                  <ul>
                    <li className='course-footer__share-list-item lkd'>Share link in Linkedin</li>
                    <li className='course-footer__share-list-item twr'>Share link in Twitter</li>
                  </ul>
                </div>
              </div>
            ): null}
          </div>
        </div>
      </div>
    </>
  )
}
