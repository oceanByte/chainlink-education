import { ICoursesGroups } from 'helpers/coursesInfo'
import React from 'react'

import { PublicUser } from '../../../shared/user/PublicUser'
import PanelWrapper from './Panel/Panel.controller'


export interface IAccordionView{
  data: {
    coursesBySubject: ICoursesGroups[],
    handlerActiveTab: (index: number) => void
    activeTab: number
    user?: PublicUser
  }
}

export const AccordionView = ({ data }: IAccordionView) => {

  const { coursesBySubject, handlerActiveTab, activeTab, user } = data;

  return (
    <>
      {coursesBySubject.map((group, index) => (
        <PanelWrapper key={group.subject} data={{
          group,
          handlerActiveTab,
          activeTab,
          user,
          index,
        }} />
      ))}
    </>
  )
}
