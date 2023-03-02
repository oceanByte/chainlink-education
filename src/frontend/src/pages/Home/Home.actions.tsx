import { store } from 'index'

export const GET_COURSES_REQUEST_TEST = 'GET_COURSES_REQUEST_TEST'
export const GET_COURSES_SUCCESS_TEST = 'GET_COURSES_SUCCESS_TEST'
export const GET_COURSES_FAILURE_TEST = 'GET_COURSES_FAILURE_TEST'

export const getCoursesTest = () => (dispatch: any) => {
    dispatch({
        type: GET_COURSES_REQUEST_TEST,
    });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_COURSES_SUCCESS_TEST,
                payload: data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_COURSES_FAILURE_TEST,
                payload: error,
            });
        });
}