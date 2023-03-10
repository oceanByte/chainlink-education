export enum CourseNameType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Introduction',
  SOLIDITY_102 = 'Solidity 102',
  VRF_V2 = 'VRF v2 Introduction',
  ADVANCED_VRF_V2 = 'VRF v2 Advanced',
  CHAINLINK_KEEPERS = 'Chainlink Keepers',
}

export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}


// chaptersByCourse: Used to render chapter data of each course.
// the key in chaptersByCourse == the path in courseData
type ChapterDataDictionary = {
  [key: string]: any
}
