import { ICoursesGroups } from 'helpers/coursesInfo'
import React from 'react'

import { PublicUser } from '../../../shared/user/PublicUser'
import PanelWrapper from './Panel/Panel.controller'


export interface IAccordionView{
  data: {
    courses: ICoursesGroups[],
    handlerActiveTab: (index: number) => void
    activeTab: number
    user?: PublicUser
    type: string
  }
}

export const AccordionView = ({ data }: IAccordionView) => {

  const { courses, handlerActiveTab, activeTab, user, type } = data;

  return (
    <>
      {courses.map((group, index) => (
        <PanelWrapper key={group.subject} data={{
          group,
          handlerActiveTab,
          activeTab,
          user,
          index,
          type,
        }} />
      ))}
    </>
  )
}
