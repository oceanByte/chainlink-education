export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}

export enum CourseTitleType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Introduction',
  SOLIDITY_102 = 'Solidity 102',
  VRF_V2 = 'VRF v2 Introduction',
  VRF_V2_102 = 'VRF v2 Advanced'
}

export enum CourseSubjectType {
  CHAINLINK = 'Chainlink Introduction',
  SOLIDITY = 'Solidity',
  VRF_V2 = 'VRF v2',
  CHAINLINK_STAKING = 'Chainlink Staking',
  REAL_USE_CASE_EXAMPLES = 'Real use case example',
}

export const GROUPS = [
  {
    subject: CourseSubjectType.CHAINLINK,
    courses: [CourseTitleType.CHAINLINK_101]
  },
  {
    subject: CourseSubjectType.SOLIDITY,
    courses: [CourseTitleType.SOLIDITY_INTRO, CourseTitleType.SOLIDITY_102]
  },
  {
    subject: CourseSubjectType.VRF_V2,
    courses: [CourseTitleType.VRF_V2, CourseTitleType.VRF_V2_102]
  },
  {
    subject: CourseSubjectType.CHAINLINK_STAKING,
    courses: []
  },
  {
    subject: CourseSubjectType.REAL_USE_CASE_EXAMPLES,
    courses: []
  },
]

export const COURSES = [
  {
    subject: CourseSubjectType.CHAINLINK,
    title: CourseTitleType.CHAINLINK_101,
    description: `Chainlink decentralized oracle networks provide tamper-proof inputs, outputs, and computations`,
    difficulty: 1,
    status: CourseStatusType.NEW
  },
  {
    subject: CourseSubjectType.SOLIDITY,
    title: CourseTitleType.SOLIDITY_INTRO,
    description: `Solidity is an object-oriented, high-level language for implementing smart contracts. Learn about the basics here.`,
    difficulty: 2,
    status: CourseStatusType.NEW
  },
  {
    subject: CourseSubjectType.SOLIDITY,
    title: CourseTitleType.SOLIDITY_102,
    description: `Learn more about the EVM, complex data types, flow control, access control, error handling and inheritance.`,
    difficulty: 3,
    status: CourseStatusType.NEW,
    progress: [],
  },
  {
    subject: CourseSubjectType.VRF_V2,
    title: CourseTitleType.VRF_V2,
    description: `Study how VRF can be used to bring Verfiable Randomness to blockchain.`,
    difficulty: 2,
    status: CourseStatusType.NEW
  },
  {
    subject: CourseSubjectType.VRF_V2,
    title: CourseTitleType.VRF_V2_102,
    description: `Explore the technical details and practical usage of VRF v2.`,
    difficulty: 3,
    status: CourseStatusType.NEW
  }
]


