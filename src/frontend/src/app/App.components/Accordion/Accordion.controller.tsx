import React from 'react'

import { PublicUser } from '../../../shared/user/PublicUser'

import { AccordionView } from './Accordion.view'
import { ICoursesGroups } from 'helpers/coursesInfo'

interface IAccordion {
  courses: ICoursesGroups[]
  user?: PublicUser
  type: string
}

export const Accordion = ({ courses, user, type }: IAccordion) => {
  const [state, setState] = React.useState({
    activeTab: 0,
  });

  const handlerActiveTab = (index: number) => {
    setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  };

  return (
    <AccordionView
      data={{
        courses,
        handlerActiveTab,
        activeTab: state.activeTab,
        user,
        type,
      }}
    />
  )
}
