import { course as ChainlinkIntroduction } from '../Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../Courses/solidityIntroduction'
import { course as VDFIntroduction } from '../Courses/vdfIntroduction'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as VDFIntroductionChapters } from '../Courses/vdfIntroduction/Chapters/Chapters.data'
import { CourseData } from './Course.controller'

export enum CourseNameType {
  CHAINLINK_101 = 'Chainlink 101',
  SOLIDITY_INTRO = 'Solidity Intro',
  VDF_V2 = 'VDF v2 Overview'
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
    path: VDFIntroduction.path,
    pathname: `/${VDFIntroduction.path}/info`,
    name: CourseNameType.VDF_V2,
    data: VDFIntroduction,
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
  vdfIntroduction: VDFIntroductionChapters,
}
