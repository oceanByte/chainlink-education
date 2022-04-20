import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from 'shared/course'

import { CourseStatusType } from 'pages/Course/Course.data'
import { MainButtonView } from '../MainButton/MainButton.view'
import { CircularProgressBar } from '../CircleProgressBar/CircleProgressBar.view'
import { ShareCertificate } from '../ShareCertificate/ShareCertificate.view'
import { BadgeView } from '../Badge/Badge.view'
import { IDataCourses } from '../Profile/Certificates/Certificates.view'

import { MAX_DIFFICULTY } from '../Profile/OverallProgress/OveralProgress.view'

interface ICourseView {
  course: Course
  infoCourses: IDataCourses
  user?: PublicUser
}

export const CourseCardView = ({ infoCourses, course, user }: ICourseView) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [isShowList, setIsShowList] = useState(false);
  const additionalInfo = infoCourses.courses[course.title]

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
          <div className='course-inner__badge-container'>
            <BadgeView
              hasMediumBadge
              percentage={additionalInfo.percent}
              isCompleted={course.status === CourseStatusType.COMPLETED}
              title={course.title}
            />
          </div>
          <div className='course-inner__difficulty'>
            <div className='course-inner__difficulty-items'>
              {new Array(MAX_DIFFICULTY)
                .fill('')
                .map((_, index) => (
                  <div key={index} className={classnames('course-inner__difficulty-item', index + 1 <= course.difficulty && 'isFilled')} />
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
                <div className='icon'/><div>{additionalInfo.countChapters} chapters</div>
              </div>
              <div className='course-additional-info__time item'>
                <div className='icon'/><div>{additionalInfo.amountOfTime}</div>
              </div>
            </div>
            <div className="course-description">{course.description}</div>
          </div>
          
          <div className={classnames('course-footer', additionalInfo.percent === 100 && 'completed')}>
            <div className="course-btn-wrapper">
              {!additionalInfo.percent ? <MainButtonView
                  isPrimary
                  hasArrowUpRight
                  text='View Course'
                  onClick={() => history.push(additionalInfo.urlChapter)}
                  loading={false}
                  disabled={false}
                /> : null}
              {additionalInfo.percent && additionalInfo.percent !== 100 ? <MainButtonView
                  isSecondary
                  hasArrowUpRight
                  text='Continue'
                  onClick={() => history.push(additionalInfo.urlChapter)}
                  loading={false}
                  disabled={false}
                /> : null}
              {additionalInfo.percent && additionalInfo.percent === 100 ? (
                <>
                  <div ref={wrapperRef} className='useCertificate'>
                    <MainButtonView
                      isCompleted
                      isSecondary
                      hasArrowDown
                      text='Use certificate'
                      onClick={showList}
                      loading={false}
                      disabled={false}
                      className={isShowList ? 'hasArrowUp' : ''}
                    />

                  <div className={classnames('useCertificate__list', isShowList && 'show')}>
                    <ul>
                      <li>
                        <MainButtonView
                          isCompleted
                          isSecondary
                          hasArrowDown
                          text='Download certificate'
                          onClick={() => history.push(additionalInfo.urlChapter)}
                          loading={false}
                          disabled={false}
                        />
                      </li>
                      <li>
                        <ShareCertificate />
                      </li>
                    </ul>
                  </div>
                  </div>
                  <div className='downloadCertificate'>
                    <MainButtonView
                      isCompleted
                      isSecondary
                      hasArrowDown
                      text='Download certificate'
                      onClick={() => history.push(additionalInfo.urlChapter)}
                      loading={false}
                      disabled={false}
                    />
                  </div>
                </>)  : null}
            </div>
            {user && additionalInfo.percent && additionalInfo.percent !== 100 ? (
              <div className="course-footer__progress-bar">
                <div className="circle-wrap">
                  <CircularProgressBar
                    strokeWidth="7"
                    sqSize="60"
                    percentage={additionalInfo.percent}/>
                </div>
                </div>
            ): null}

            {user && additionalInfo.percent && additionalInfo.percent === 100 ? (
              <div className='downloadCertificate'>
                <ShareCertificate className="isCardCourse" />
              </div>
            ): null}
          </div>
        </div>
      </div>
    </>
  )
}
