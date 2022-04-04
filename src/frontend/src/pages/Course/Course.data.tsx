import { course as ChainlinkIntroduction } from '../Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../Courses/vrfIntroduction'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../Courses/vrfIntroduction/Chapters/Chapters.data'
import { CourseData } from './Course.controller'

export enum CourseNameType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Introduction',
  VRF_V2 = 'VRF v2 Introduction',
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
  vrfIntroduction: vrfIntroductionChapters,
}
