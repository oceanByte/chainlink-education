import React from 'react'

import classNames from 'classnames';

import { PublicUser } from '../../../../shared/user/PublicUser'
import { Course } from '../../../../shared/course'
import { CourseProgressCardView } from 'app/App.components/Profile/OverallProgress/CourseProgressCard/CourseProgressCard.view';
import { getCoursesData } from 'helpers/coursesInfo';
import { CircularProgressBar } from 'app/App.components/CircleProgressBar/CircleProgressBar.view';
import { CourseStatusType } from 'pages/Course/Course.data';

interface IPanelProfileView {
  data: {
    subject: string
    courses: Course[]
    overallProgress: number
    user?: PublicUser
    handlerOpenGroupTab: () => void
    isActive: boolean
    panelInnerRef: any
    innerStyle: {
      height: string,
    }
  }
}

export const PanelProfileView = ({ data }: IPanelProfileView) => {
  const { subject, courses, overallProgress, isActive, handlerOpenGroupTab, panelInnerRef, innerStyle, user } = data;

  if (!courses?.length || overallProgress === 100) return null;

  const infoCourses = getCoursesData(courses || []);

  return (
    <div className={classNames('panel panel-profile', { active: isActive })}>
      <div className={classNames('panel-header')} onClick={() => handlerOpenGroupTab()}>
        <div className="panel-header__wrapper">
          <div className="panel-header__wrapper-title">
            <span>
              { subject }
            </span>
          </div>
          <div className='panel-header__wrapper-block'>
            <div className="panel-header__wrapper-progress-bar">
              <div className="circle-wrap">
                <CircularProgressBar
                  strokeWidth="7"
                  sqSize="60"
                  percentage={overallProgress}
                  className="overallGroupProgress"
                />
              </div>
            </div>
            <div className={classNames('panel-header__wrapper-arrow', { active: isActive })} />
          </div>
        </div>
      </div>
      <div
        ref={panelInnerRef}
        style={innerStyle}
        className={classNames('panel-inner')}
        >
          <div className='sections-content__wrapper'>
            <div className={
              classNames('sections-content__courses')
              }>
              {courses.map((course) => course.status !== CourseStatusType.COMPLETED ? (
                <div
                  key={course.title}
                  className={classNames('panel-content')}
                >
                  <CourseProgressCardView user={user} infoCourses={infoCourses} course={course} />
                </div>
              ): null )}
            </div>
          </div>
      </div>
    </div>
  );
}