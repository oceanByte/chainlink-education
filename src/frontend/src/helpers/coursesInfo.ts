import { CourseNameType, CourseStatusType } from "pages/Course/Course.data";
import { Course } from "shared/course";

import { course as ChainlinkIntroduction } from '../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../pages/Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../pages/Courses/vrfIntroduction'

import { chapterData as ChainlinkIntroductionChapters } from '../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../pages/Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../pages/Courses/vrfIntroduction/Chapters/Chapters.data'

interface ICoursesData {
  overallProgress: number,
  numberCourses: number,
  numberCompletedCourses: number,
  courses: any
}

const getUrl = (progress: number, path: string, countChapter: number) => {
  if (progress === 0 || progress === countChapter) {
   return `/${path}/chapter-1`
  }

  return `/${path}/chapter-${progress + 1}`
}

export const getCourseChapters = (title: string) => {
  if (title === CourseNameType.CHAINLINK_101) {
    return { chapters: ChainlinkIntroductionChapters, additionalInfo: ChainlinkIntroduction }
  } else if (title === CourseNameType.SOLIDITY_INTRO) {
    return { chapters: SolidityIntroductionChapters, additionalInfo: SolidityIntroduction}
  } else if (title === CourseNameType.VRF_V2) {
    return { chapters: vrfIntroductionChapters, additionalInfo: vrfIntroduction}
  }

  return {
    chapters: [],
    additionalInfo: {
      amountOfTime: '',
      path: '/'
    }
  };
}

export const getCoursesData = (courses: Course[]) => {
  const coursesData: ICoursesData = {
    overallProgress: 0,
    numberCompletedCourses: 0,
    numberCourses: courses.length,
    courses: {},
  };

  let numberAllChapters = 0;
  let numberCompletedChapters = 0;

  courses.forEach((course:Course) => {
    const title = course.title
    const courseProgress = course.progress.length

    const { chapters, additionalInfo } = getCourseChapters(title)
    const urlChapter = getUrl(courseProgress, additionalInfo.path, ChainlinkIntroductionChapters.length)
    coursesData.courses[title] = {
      ...course,
      percent: Math.floor((courseProgress / chapters.length) * 100),
      countChapters: chapters.length,
      amountOfTime:  additionalInfo?.amountOfTime,
      urlChapter
    }

    numberAllChapters += chapters.length;
    numberCompletedChapters += courseProgress;

    if (course.status === CourseStatusType.COMPLETED) {
      coursesData.numberCompletedCourses += 1;
    }
  });

  coursesData.overallProgress = Math.floor((numberCompletedChapters / numberAllChapters) * 100)

  return {
    ...coursesData,
  }
}