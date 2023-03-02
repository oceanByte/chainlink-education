import { GET_COURSES_SUCCESS_TEST } from "../pages/Home/Home.actions"




const coursesInitialState: any = []

export function courses(state = coursesInitialState, action: any): any {
  switch (action.type) {
    case GET_COURSES_SUCCESS_TEST: {
      return {
        ...state,
        courses: action.payload,
      }
    }
    default:
      return state
  }
}