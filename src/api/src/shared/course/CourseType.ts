export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}

export enum CourseTitle {
  OCEAN_101 = 'Ocean 101',
  INTRO_TO_DATA = 'Intro to Data defi',
  COMPUTE_TO_DATA = 'Compute-to-data'
}

export const COURSES = [
  {
    title: CourseTitle.OCEAN_101,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitle.COMPUTE_TO_DATA,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitle.INTRO_TO_DATA,
    description: `This is a simple Chainlink 101 course that teaches you the basicsof the
      Chainlink Ecosystem and how Oracles work in general
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  }
]


