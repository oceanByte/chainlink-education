import { store } from 'index'

export const GET_COURSES_PAGE_REQUEST = ' GET_COURSES_PAGE_REQUEST'
export const GET_COURSES_PAGE_SUCCESS = 'GET_COURSES_PAGE_SUCCESS'
export const GET_COURSES_PAGE_FAILURE = 'GET_COURSES_PAGE_FAILURE'

export const getCourseByURL = (urlCourse: string) => async (dispatch: any) => {
    dispatch({
        type: GET_COURSES_PAGE_REQUEST,
    });
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course/${urlCourse}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_COURSES_PAGE_SUCCESS,
                payload: data.course,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_COURSES_PAGE_FAILURE,
                payload: error,
            });
        });
}