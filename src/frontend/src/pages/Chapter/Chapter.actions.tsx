import { store } from 'index'
import { AddProgressInputs } from 'shared/user/AddProgress'

export const ADD_PROGRESS_REQUEST = 'ADD_PROGRESS_REQUEST'
export const ADD_PROGRESS_COMMIT = 'ADD_PROGRESS_COMMIT'
export const ADD_PROGRESS_ROLLBACK = 'ADD_PROGRESS_ROLLBACK'
export const GET_CURRENT_CHAPTER_REQUEST = 'GET_CURRENT_CHAPTER_REQUEST'
export const GET_CURRENT_CHAPTER_SUCCESS = 'GET_CURRENT_CHAPTER_SUCCESS'
export const GET_CURRENT_CHAPTER_FAILURE = 'GET_CURRENT_CHAPTER_FAILURE'
export const ADD_ANSWER_REQUEST = 'ADD_ANSWER_REQUEST'
export const ADD_COURSE_PROGRESS_PERCENT = "ADD_COURSE_PROGRESS_PERCENT"

export const addProgress = (addProgressVariables: AddProgressInputs) => (dispatch: any) => {
  const { courseId, coursePath, chapterPath, date_of_completion } = addProgressVariables
  dispatch({
    type: ADD_PROGRESS_REQUEST,
    payload: {
      coursePath, chapterPath, date_of_completion
    },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/v1/users/progress`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: {
            courseId,
            coursePath, chapterPath, date_of_completion
          },
        },
        commit: { type: ADD_PROGRESS_COMMIT, meta: {} },
        rollback: { type: ADD_PROGRESS_ROLLBACK, meta: {} },
      },
    },
  })
}




export const getChapter = (urlCourse: string, currentChapter: string) => async (dispatch: any) => {
  dispatch({
    type: GET_CURRENT_CHAPTER_REQUEST,
  });
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course/${urlCourse}/chapter-${currentChapter}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: GET_CURRENT_CHAPTER_SUCCESS,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_CURRENT_CHAPTER_FAILURE,
        payload: error,
      });
    });
}


export const validateAnswer = (urlCourse: string, answers: { question: string, answers: string[] }[]) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course${urlCourse}/validation`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.getState().auth.jwt}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answer: answers })
  })
    .then(response => response.json())
}


export const validateSolution = (urlCourse: string, solution: string) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course${urlCourse}/validation/solution`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.getState().auth.jwt}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ solution })
  })
    .then(response => response.json())
}