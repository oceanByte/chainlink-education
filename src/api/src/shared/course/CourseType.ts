export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}

export enum CourseTitleType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Introduction',
  VRF_V2 = 'VRF v2 Introduction'
}

export const COURSES = [
  {
    title: CourseTitleType.CHAINLINK_101,
    description: `Chainlink decentralized oracle networks provide tamper-proof inputs, outputs, and computations`,
    difficulty: 2,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitleType.SOLIDITY_INTRO,
    description: `Solidity is an object-oriented, high-level language for implementing smart contracts. Learn about the basics here.`,
    difficulty: 3,
    status: CourseStatusType.NEW
  },
  {
    title: CourseTitleType.VRF_V2,
    description: `Study how VRF can be used to bring Verfiable Randomness to blockchain. 
    `,
    difficulty: 3,
    status: CourseStatusType.NEW
  }
]


