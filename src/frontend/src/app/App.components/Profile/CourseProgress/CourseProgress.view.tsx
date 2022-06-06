import React from 'react'
import { useLocation } from 'react-router-dom'

import { PublicUser } from 'shared/user/PublicUser'

import { CourseStatusType } from 'pages/Course/Course.data'
import { CircularProgressBar } from '../../CircleProgressBar/CircleProgressBar.view'
import { BadgeView } from '../../Badge/Badge.view'
import { ChaptersListView } from 'app/App.components/ChaptersList/ChaptersListView'
import { IAdditionalInfo } from 'helpers/coursesInfo'

export const MAX_DIFFICULTY = 5;

interface ICourseView {
  user?: PublicUser
  courseId: string
  additionalInfo: IAdditionalInfo
}

export const CourseProgressView = ({ user, courseId, additionalInfo }: ICourseView) => {
  const { pathname } = useLocation()

  return (
    <div className='profile-page-progress-wrapper'>
      <div className='top-header'>
        <div className='title-wrapp'>
          <div className='badge-container'>
            <BadgeView
              hasSmallBadge
              percentage={additionalInfo.percent}
              isCompleted={additionalInfo.status === CourseStatusType.COMPLETED}
              title={additionalInfo.title}
            />
          </div>
          <div className="title h-font">
            {additionalInfo.title}
          </div>
        </div>
        <div className="circle-wrap">
          <CircularProgressBar
            strokeWidth="7"
            sqSize="60"
            percentage={additionalInfo.percent}
          />
        </div>
      </div>
      <div className='chapters__container'>
        <ChaptersListView user={user} coursePath={courseId} course={additionalInfo} pathname={pathname} />
      </div>
    </div>
  )
}
