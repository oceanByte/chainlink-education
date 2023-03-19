import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { State } from 'reducers'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'

import { getUser } from 'pages/User/User.actions'
import { validateAnswer, addProgress, getChapter, ADD_COURSE_PROGRESS_PERCENT, validateSolution } from './Chapter.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'

import { PublicUser } from 'shared/user/PublicUser'
import { Course } from "shared/course"

import { ChapterView } from './Chapter.view'

export interface ChapterData {
  pathname: string
  name: string
  description?: string
  data: Data
}

export type Question = {
  question: string
  answers: string[]
  responses: string[]
  proposedResponses?: string[]
}

export enum TabType {
  CONTENT = 'Content',
  VIDEO = 'Video',
  HINTS = 'Hints',
}

export interface IValidator {
  validatorState: string
  validateCallback: () => void
  validatorContent: IValidatorContent
}

export interface IValidatorContent {
  pending: {
    [key: string]: string
  }
  wrong: {
    [key: string]: string
  }
  right: {
    [key: string]: string
  }
}

export interface Data {
  course: string | undefined
  exercise: string | undefined
  solution: string | undefined
  description: string | undefined
  video: string | undefined
  hints: string | undefined
  supports: Record<string, string | undefined>
  questions: Question[]
  validatorContent: IValidatorContent
}

export const Chapter = () => {
  const [time, setTime] = useState({
    value: 0,
  })
  const [validatorState, setValidatorState] = useState(PENDING)
  const currentChapter = useSelector((state: State) => state.currentChapter)
  const params = useParams<string[]>();
  const plainCurrentCourse = useSelector((state: State) => state.courses.find((course: Course) => course.urlCourse === params[0]))
  const [showDiff, setShowDiff] = useState(false)
  const [isAccount, setIsAccount] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState<Data>({
    course: undefined,
    exercise: undefined,
    solution: undefined,
    description: undefined,
    video: undefined,
    hints: undefined,
    supports: {},
    questions: [],
    validatorContent: {
      pending: {},
      right: {},
      wrong: {},
    },
  })

  const [tab, setTab] = useState<string>(TabType.CONTENT)
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)
  const currentCourse = user ? { ...user.courses?.find((course: any) => course?.title === plainCurrentCourse?.title), ...plainCurrentCourse } : plainCurrentCourse
  const indexOfCurrentChapter = currentCourse?.chapters?.findIndex((chapter: { pathname: string, name: string }) => chapter.pathname === currentChapter.pathname) ?? 0

  let intervalID: any = useRef(null)
  const partCurrentUrl = pathname.split('/')[1]

  const additionalInfo = currentCourse

  /* eslint-disable @typescript-eslint/no-unused-vars */
  let badgeUnlocked = false
  let counter = 0
  user?.progress?.forEach((chapter) => {
    counter++
  })

  if (counter >= 20 && !badgeUnlocked) {
    badgeUnlocked = true
  }
  useEffect(() => {
    if (user) dispatch(getUser({ username: user.username }))
    dispatch(getChapter(partCurrentUrl, pathname.split('-')[1]))

    if (pathname?.split('-')[1] === currentChapter?.pathname?.split('-')[1]) {
      setData(currentChapter.data)
    }
    if (user) dispatch(getUser({ username: user.username }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentChapter.pathname])

  const getNextChapterLink = () => {
    if (currentCourse?.chapters?.length - 1 === indexOfCurrentChapter) {
      return user ? `/profile/certificates` : '/sign-up'

    } else {
      return currentCourse.chapters[indexOfCurrentChapter + 1].pathname
    }
  }

  const getPreviousChapterLink = () => {
    return indexOfCurrentChapter === 0 ? "/" : currentCourse.chapters[indexOfCurrentChapter - 1]?.pathname
  }

  const countUp = () => {
    setTime((prev) => ({
      value: ++prev.value,
    }))
  }

  useEffect(() => {
    if (user) {
      intervalID.current = setInterval(countUp, 1000)
    }
    return () => clearInterval(intervalID.current)
  }, [user])

  const findCurrentCourse = (user: PublicUser) => {
    let course = null
    const { courses } = user

    if (currentCourse) {
      course = courses?.find((course) => course.title === currentCourse?.title)

      return {
        ...course,
        path: currentCourse.urlCourse,
      }
    }
    return course
  }

  const getContentOnPage = (): string => {
    switch (tab) {
      case TabType.CONTENT:
        return data.course || ''
      case TabType.VIDEO:
        return data.video || ''
      case TabType.HINTS:
        return data.hints || ''

      default:
        return data.course || ''
    }
  }

  const setTabOnPage = (currentTab: string) => {
    setTab(() => currentTab)
  }
  const validateCallback = async () => {
    if (
      getNextChapterLink() === `/profile/certificates` ||
      additionalInfo.progress?.length === additionalInfo.countChapters - 1
    ) {
      setValidatorState(RIGHT)
      if (user) {
        clearInterval(intervalID.current)
        const course = findCurrentCourse(user)
        dispatch(
          addProgress({
            date_of_completion: time.value,
            chapterPath: pathname,
            courseId: additionalInfo ? additionalInfo.id : '',
            coursePath: course ? course.path : '',
          }),
        )
      }
      setIsAccount(true)
      return

    }

    if (data.questions.length > 0) {
      const validationResponse = await validateAnswer(
        currentChapter.pathname,
        data?.questions?.map(question => ({
          question: question?.question ?? '',
          answers: question?.proposedResponses ?? []
        })) ?? []
      );
      let ok = validationResponse.answerIs

      if (ok) {
        setValidatorState(RIGHT)
        setIsAccount(true)
        if (user) {
          clearInterval(intervalID.current)
          const course = findCurrentCourse(user)
          dispatch({ type: ADD_COURSE_PROGRESS_PERCENT, payload: { urlCourse: course.path, chapterUrl: pathname } })
          dispatch(
            addProgress({
              date_of_completion: time.value,
              chapterPath: pathname,
              courseId: additionalInfo ? additionalInfo.id : '',
              coursePath: course.path,
            }),
          )
        } else dispatch(showToaster(SUCCESS, 'Register to save progress', 'and get your completion certificate'))
      } else setValidatorState(WRONG)
    } else {
      if (showDiff) {
        setShowDiff(false)
        setValidatorState(PENDING)
      } else {
        setShowDiff(true)
        if (data.exercise && data.solution) {
          const { answerIs } = await validateSolution(currentChapter.pathname, data.exercise)
          if (answerIs) {
            setValidatorState(RIGHT)
            setIsAccount(true)
            if (user) {
              clearInterval(intervalID.current)
              const course = findCurrentCourse(user)
              dispatch(
                addProgress({
                  date_of_completion: time.value,
                  chapterPath: pathname,
                  courseId: additionalInfo ? additionalInfo.id : '',
                  coursePath: course.path,
                }),
              )
            } else dispatch(showToaster(SUCCESS, 'Register to save progress', 'and get your completion certificate'))
          } else setValidatorState(WRONG)
        } else setValidatorState(WRONG)
      }
    }
  }

  const startTaskHandler = () => {
    setIsStarted(true)
  }

  const proposedSolutionCallback = (e: string) => {
    // @ts-ignore
    setData({ ...data, exercise: e })
  }

  const proposedQuestionAnswerCallback = (e: Question[]) => {
    // @ts-ignore

    setData({ ...data, questions: e })
  }
  return (
    <>
      {data.course && (
        <ChapterView
          validatorState={validatorState}
          validateCallback={validateCallback}
          validatorContent={data.validatorContent}
          solution={data.solution}
          proposedSolution={data.exercise}
          proposedSolutionCallback={proposedSolutionCallback}
          showDiff={showDiff}
          isAccount={isAccount}
          course={getContentOnPage()}
          tab={tab}
          setTabOnPage={setTabOnPage}
          closeIsAccountModal={() => setIsAccount(false)}
          user={user}
          supports={data.supports}
          questions={data.questions}
          nextChapter={getNextChapterLink()}
          previousChapter={getPreviousChapterLink()}
          isStarted={isStarted}
          percent={currentCourse.percent ?? 0}
          startedHandler={startTaskHandler}
          proposedQuestionAnswerCallback={proposedQuestionAnswerCallback}
          currentCourse={user ? findCurrentCourse(user) : null}
          additionalInfo={additionalInfo}
        />
      )}
      {/* <Footer percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} /> */}
    </>
  )
}
