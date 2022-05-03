import { store } from 'index'
import { GetCertificateInputs } from 'shared/page/GetCertificate'

export const GET_CERTIFICATE_REQUEST = 'GET_CERTIFICATE_REQUEST'
export const GET_CERTIFICATE_COMMIT = 'GET_CERTIFICATE_COMMIT'
export const GET_CERTIFICATE_ROLLBACK = 'GET_CERTIFICATE_ROLLBACK'

export const getCertificate = ({ username, coursePath, courseId }: GetCertificateInputs) => (dispatch: any) => {
  dispatch({
    type: GET_CERTIFICATE_REQUEST,
    payload: { username, coursePath, courseId },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/page/get-certificate`,
          method: 'POST',
          headers: { Authorization: `Bearer ${store.getState().auth.jwt}` },
          json: { username, coursePath, courseId },
        },
        commit: { type: GET_CERTIFICATE_COMMIT, meta: { username, coursePath, courseId } },
        rollback: { type: GET_CERTIFICATE_ROLLBACK },
      },
    },
  })
}
