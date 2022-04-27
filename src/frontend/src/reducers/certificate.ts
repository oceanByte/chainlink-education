import { GET_CERTIFICATE_COMMIT, GET_CERTIFICATE_ROLLBACK} from 'pages/PreviewCertificate/PreviewCertificate.actions'

export interface ICertificate {
  username: string
  code: string
  userId: string
  courseId: string
}

export interface CertificateState {
  certificate: ICertificate | undefined
}

const certificateDefaultState: CertificateState = {
  certificate: undefined
}

export function certificate(state = certificateDefaultState, action: any): CertificateState {
  switch (action.type) {
    case GET_CERTIFICATE_COMMIT: {
      return {
        ...state,
        certificate: action.payload,
      }
    }
    case GET_CERTIFICATE_ROLLBACK: {
      return {
        ...state,
        certificate: undefined,
      }
    }
    default:
      return state
  }
}