import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import { auth, AuthState } from './auth'

// Drawers
import { loginDrawer, LoginDrawerState } from './loginDrawer'
import { chapterDrawer, ChapterDrawerState } from './chapterDrawer'

import { gdpr, GdprState } from './gdpr'
import { loading, LoadingState } from './loading'
import { progressBar, ProgressBarState } from './progressBar'
import { serviceWorker, ServiceWorkerState } from './serviceWorker'
import { toaster, ToasterState } from './toaster'
import { users, UsersState } from './users'
import { certificate, CertificateState } from './certificate'
import { courses } from './courses'
import { currentChapter } from './currentChapter'

export const reducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    loading,
    users,
    courses,
    currentChapter,
    toaster,
    chapterDrawer,
    loginDrawer,
    progressBar,
    serviceWorker,
    gdpr,
    certificate
  })

export interface State {
  auth: AuthState
  loading: LoadingState
  users: UsersState
  toaster: ToasterState
  loginDrawer: LoginDrawerState
  chapterDrawer: ChapterDrawerState
  progressBar: ProgressBarState
  serviceWorker: ServiceWorkerState
  gdpr: GdprState
  certificate: CertificateState
  courses: any
  currentChapter: any
}
