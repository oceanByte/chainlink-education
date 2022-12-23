import React from 'react'

import { PublicUser } from '../../../shared/user/PublicUser'
import { Course } from '../../../shared/course'

import { AccordionView } from './Accordion.view'
import { createGroupsBySubject } from 'helpers/coursesInfo'

interface IAccordion {
  courses: Course[] | undefined
  user?: PublicUser
}

export const Accordion = ({ courses, user }: IAccordion) => {
  const [state, setState] = React.useState({
    activeTab: 0,
  });

  if (!courses) return null;

  const handlerActiveTab = (index: number) => {
    setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  };

  const coursesBySubject = createGroupsBySubject(courses);

  return (
    <AccordionView
      data={{
        coursesBySubject,
        handlerActiveTab,
        activeTab: state.activeTab,
        user,
      }}
    />
  )
}
