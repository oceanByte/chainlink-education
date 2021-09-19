import { course as ChainlinkIntroduction } from '../Courses/chainlinkIntroduction'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { CourseData } from './Course.controller'

export const courseData: CourseData[] = [
  {
    path: ChainlinkIntroduction.path,
    pathname: `/${ChainlinkIntroduction.path}/info`,
    name: 'Chalink Introduction',
    data: ChainlinkIntroduction,
  },
]

// chaptersByCourse: Used to render chapter data of each course.
// the key in chaptersByCourse == the path in courseData
type ChapterDataDictionary = {
  [key: string]: any
}

export const chaptersByCourse: ChapterDataDictionary = {
  chainlinkIntroduction: ChainlinkIntroductionChapters,
}
