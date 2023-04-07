import { GET_COURSES_PAGE_SUCCESS } from "app/App.components/CourseCard/CourseCard.action"
import { ADD_COURSE_PROGRESS_PERCENT } from "pages/Chapter/Chapter.actions"
import { Course } from "shared/course"
import { GET_COURSES_SUCCESS } from "../pages/Home/Home.actions"




const coursesInitialState: any = []

export function courses(state = coursesInitialState, action: any): any {
  switch (action.type) {
    case GET_COURSES_SUCCESS: {
      return action.payload
    }
    case GET_COURSES_PAGE_SUCCESS: {

      const newCourses = state?.map((course: Course) => (
        course.urlCourse === action.payload.urlCourse ? { ...course, ...action.payload } : course)) ?? []
      return newCourses.length ? newCourses : [{ ...action.payload, description: "" }]
    }

    case ADD_COURSE_PROGRESS_PERCENT: {

      const currentCourse: Course = state.find((course: Course) => course.urlCourse === action.payload.urlCourse)
      const isNewChapter = !currentCourse.progress?.find((i: string) => i === action.payload.chapterUrl)

      if (isNewChapter) {
        const chaptersLength = currentCourse?.chapters?.length ?? 0
        const filledChapters = (currentCourse?.percent ?? 0) / 100 * chaptersLength
        const newPercent = (filledChapters + 1) / (chaptersLength || 1) * 100

        const newCourses = state.map((course: Course) => {
          if (course.urlCourse === action.payload.urlCourse) {
            return { ...course, percent: newPercent, progress: [...currentCourse?.progress ?? [], action.payload.chapterUrl] }
          } else {
            return course
          }
        })
        return newCourses
      } else {
        return state
      }
    }

    default:
      return state

  }
} 