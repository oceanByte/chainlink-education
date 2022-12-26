import { course as ChainlinkIntroduction } from '../Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../Courses/vrfIntroduction'
import { course as Solidity102 } from '../Courses/solidity102'
import { course as vrf102 } from '../Courses/vrf102'

import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as Solidity102Chapters } from '../Courses/solidity102/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../Courses/vrfIntroduction/Chapters/Chapters.data'
import { chapterData as vrf102Chapters } from '../Courses/vrf102/Chapters/Chapters.data'

import { CourseData } from './Course.controller'

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

export enum CourseSubjectType {
  CHAINLINK = 'Chainlink Introduction',
  SOLIDITY = 'Solidity',
  VRF_V2 = 'VRF v2',
  CHAINLINK_STAKING = 'Chainlink Staking',
  REAL_USE_CASE_EXAMPLES = 'Real use case example',
}


export const courseData: CourseData[] = [
  {
    path: ChainlinkIntroduction.path,
    pathname: `/${ChainlinkIntroduction.path}/info`,
    name: CourseNameType.CHAINLINK_101,
    subject: CourseSubjectType.CHAINLINK,
    data: ChainlinkIntroduction,
  },
  {
    path: SolidityIntroduction.path,
    pathname: `/${SolidityIntroduction.path}/info`,
    name: CourseNameType.SOLIDITY_INTRO,
    subject: CourseSubjectType.SOLIDITY,
    data: SolidityIntroduction,
  },
  {
    path: Solidity102.path,
    pathname: `/${Solidity102.path}/info`,
    name: CourseNameType.SOLIDITY_102,
    subject: CourseSubjectType.SOLIDITY,
    data: Solidity102,
  },
  {
    path: vrfIntroduction.path,
    pathname: `/${vrfIntroduction.path}/info`,
    name: CourseNameType.VRF_V2,
    subject: CourseSubjectType.VRF_V2,
    data: vrfIntroduction,
  },
  {
    path: vrf102.path,
    pathname: `/${vrf102.path}/info`,
    name: CourseNameType.ADVANCED_VRF_V2,
    subject: CourseSubjectType.VRF_V2,
    data: vrf102,
  },
]

// chaptersByCourse: Used to render chapter data of each course.
// the key in chaptersByCourse == the path in courseData
type ChapterDataDictionary = {
  [key: string]: any
}

export const chaptersByCourse: ChapterDataDictionary = {
  chainlinkIntroduction: ChainlinkIntroductionChapters,
  solidityIntroduction: SolidityIntroductionChapters,
  solidity102: Solidity102Chapters,
  vrfIntroduction: vrfIntroductionChapters,
  vrf102: vrf102Chapters,
}
