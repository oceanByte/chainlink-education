import React from 'react'

import classNames from 'classnames';

import { PublicUser } from '../../../../shared/user/PublicUser'
import { Course } from '../../../../shared/course'
import { CourseCards } from 'app/App.components/CourseCard/CourseCard.controller'

interface IPanelView {
  data: {
    subject: string
    courses: Course[]
    user?: PublicUser
    index: number
    handlerActiveTab: (index: number) => void
    activeTab: number
    isActive: boolean
    panelInnerRef: any
    innerStyle: {
      height: string,
    }
    coursesLimit: number
    handleClickMore: () => void
  }
}

export const PanelView = ({ data }: IPanelView) => {
  const { subject, courses, index, handlerActiveTab, isActive, panelInnerRef, innerStyle, user, coursesLimit, handleClickMore } = data;

  if (!courses?.length) return null;

  return (
    <div className={classNames('panel panel-default', { active: isActive })}>
      <div className={classNames('panel-header')} onClick={() => handlerActiveTab(index)}>
        <div className="panel-header__wrapper">
          <div className="panel-header__wrapper-title">
            <span>
              { subject }
              <span className='panel-header__wrapper-number'>({ courses.length })</span>
            </span>
          </div>
          <div className={classNames('panel-header__wrapper-arrow', { active: isActive })} />
        </div>
      </div>
      <div
        ref={panelInnerRef}
        style={innerStyle}
        className={classNames('panel-inner')}
        >
          <CourseCards data={{
            courses,
            user,
            coursesLimit,
            handleClickMore
          }} />
      </div>
    </div>
  );
}