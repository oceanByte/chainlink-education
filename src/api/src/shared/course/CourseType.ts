export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}

export enum CourseTitleType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Intro',
  VDF_V2 = 'VDF v2 Overview'
}

export const COURSES = [
  {
    title: CourseTitleType.CHAINLINK_101,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitleType.SOLIDITY_INTRO,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitleType.VDF_V2,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  }
]


