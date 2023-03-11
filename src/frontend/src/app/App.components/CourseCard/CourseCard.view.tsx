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

import { Difficulty } from './Difficulty/Difficulty.view'
import { UseCertificate } from './UseCertificate/UseCertificate.view'
import { IAdditionalInfo } from 'helpers/coursesInfo'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

interface ICourseView {
  course: Course
  infoCourses: IDataCourses
  user?: PublicUser
}

export const CourseCardView = ({ infoCourses, course, user }: ICourseView) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [isShowList, setIsShowList] = useState(false);
  const courseInfo = useSelector((state: State) => state.courses.find((i: Course) => i.title === course.title))
  const additionalInfo = user ? { ...courseInfo, ...user.courses?.find((userCourse: any) => userCourse.title === course.title) } : course as IAdditionalInfo
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
            <Difficulty difficulty={course.difficulty} />
          </div>
        </div>
        <div className='course-inner__container'>
          <div className='course-inner__top'>
            <div className="course-title h-font">
              {course.title}
            </div>
            <div className='course-additional-info'>
              <div className='course-additional-info__chapters item'>
                <div className='icon' /><div>{additionalInfo.countChapters} chapters</div>
              </div>
              <div className='course-additional-info__time item'>
                <div className='icon' /><div>{additionalInfo.amountOfTime}</div>
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
                onClick={() => history.push(`/description/${additionalInfo.urlCourse}`)}
                loading={false}
                disabled={false}
              /> : null}
              {additionalInfo.percent && additionalInfo.percent !== 100 ? <MainButtonView
                isSecondary
                hasArrowUpRight
                text='Continue'
                onClick={() => history.push(`/description/${additionalInfo.urlCourse}`)}
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
                    <UseCertificate
                      isSecondary
                      isShowList={isShowList}
                      user={user}
                      additionalInfo={additionalInfo}
                      nextPath={`/description/${additionalInfo.urlCourse}`}
                    />
                  </div>
                  <div className='downloadCertificate'>
                    <MainButtonView
                      isCompleted
                      isSecondary
                      hasArrowDown
                      text='Download certificate'
                      onClick={() => history.push(`/description/${additionalInfo.urlCourse}`)}
                      loading={false}
                      disabled={false}
                    />
                  </div>
                </>) : null}
            </div>
            {user && additionalInfo.percent && additionalInfo.percent !== 100 ? (
              <div className="course-footer__progress-bar">
                <div className="circle-wrap">
                  <CircularProgressBar
                    strokeWidth="7"
                    sqSize="60"
                    percentage={additionalInfo.percent} />
                </div>
              </div>
            ) : null}

            {user && additionalInfo.percent && additionalInfo.percent === 100 ? (
              <div className='shareCertificate'>
                <ShareCertificate
                  className="isCardCourse"
                  additionalInfo={additionalInfo}
                  username={user.username}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
