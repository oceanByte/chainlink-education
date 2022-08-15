import { course as ChainlinkIntroduction } from '../Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../Courses/vrfIntroduction'
import { course as Solidity102 } from '../Courses/solidity102'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as Solidity102Chapters } from '../Courses/solidity102/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../Courses/vrfIntroduction/Chapters/Chapters.data'

import { CourseData } from './Course.controller'

export enum CourseNameType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Introduction',
  SOLIDITY_102 = 'Solidity 102',
  VRF_V2 = 'VRF v2 Introduction',
  ADVANCED_VRF_V2 = 'Advanced course on VRF v2',
  CHAINLINK_KEEPERS = 'Chainlink Keepers',
}

export enum CourseStatusType {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  NEW = 'NEW',
  IN_PROGRESS = 'IN PROGRESS',
}

export const courseData: CourseData[] = [
  {
    path: ChainlinkIntroduction.path,
    pathname: `/${ChainlinkIntroduction.path}/info`,
    name: CourseNameType.CHAINLINK_101,
    data: ChainlinkIntroduction,
  },
  {
    path: SolidityIntroduction.path,
    pathname: `/${SolidityIntroduction.path}/info`,
    name: CourseNameType.SOLIDITY_INTRO,
    data: SolidityIntroduction,
  },
  {
    path: Solidity102.path,
    pathname: `/${Solidity102.path}/info`,
    name: CourseNameType.SOLIDITY_102,
    data: Solidity102,
  },
  {
    path: vrfIntroduction.path,
    pathname: `/${vrfIntroduction.path}/info`,
    name: CourseNameType.VRF_V2,
    data: vrfIntroduction,
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
}
