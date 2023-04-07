import { store } from 'index'

export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST'
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS'
export const GET_COURSES_FAILURE = 'GET_COURSES_FAILURE'

export const getCourses = () => (dispatch: any) => {
    dispatch({
        type: GET_COURSES_REQUEST,
    });

    return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/course`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_COURSES_SUCCESS,
                payload: data,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_COURSES_FAILURE,
                payload: error,
            });
        });
}