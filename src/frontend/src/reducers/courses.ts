import { GET_COURSES_PAGE_SUCCESS } from "app/App.components/CourseCard/CourseCard.action"
import { Course } from "shared/course"
import { GET_COURSES_SUCCESS } from "../pages/Home/Home.actions"




const coursesInitialState: any = []

export function courses(state = coursesInitialState, action: any): any {
  switch (action.type) {
    case GET_COURSES_SUCCESS: {
      const newCourses = action.payload.map((newCourse: Course) => {
        const oldCourse = state.find((i: Course) => i.urlCourse === newCourse.urlCourse);

        return oldCourse ? { ...newCourse, ...oldCourse } : newCourse
      })

      return newCourses
    }
    case GET_COURSES_PAGE_SUCCESS: {
      const newCourses = state?.map((course: Course) => (
        course.urlCourse === action.payload.urlCourse ? { ...course, ...action.payload } : course)) ?? []
      return newCourses.length ? newCourses : [{ ...action.payload, description: "" }]
    }
    default:
      return state
  }
}