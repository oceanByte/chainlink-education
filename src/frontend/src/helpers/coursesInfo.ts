import { ObjectId } from "mongodb";

interface ICoursesData {
  overallProgress: number,
  numberCourses: number,
  numberCompletedCourses: number,
  courses: any
}

export interface IAdditionalInfo {
  amountOfTime: string
  chapters: any
  countChapters: number
  description?: string
  descriptionCourse: string
  difficulty: number
  percent: number
  progress: any
  status: string
  title: string
  urlChapter: string
  urlCourse: string
  _id: ObjectId
}
