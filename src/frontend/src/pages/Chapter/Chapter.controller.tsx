import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { State } from 'reducers'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
import { COURSES } from 'pages/Home/Home.view'

import { getUser } from 'pages/User/User.actions'
import { addProgress } from './Chapter.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'


import { getCoursesData, IAdditionalInfo } from 'helpers/coursesInfo'


import { PublicUser } from 'shared/user/PublicUser'

import { CourseData } from '../Course/Course.controller'
import { chaptersByCourse, courseData, CourseNameType } from '../Course/Course.data'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../Courses/vrfIntroduction/Chapters/Chapters.data'

import { ChapterView } from './Chapter.view'

export interface ChapterData {
  pathname: string
  name: string
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
  HINTS = 'Hints'
}

export interface IValidator {
  validatorState: string
  validateCallback: () => void
  setShowHint: (showHint: boolean) => void
  validatorContent: IValidatorContent
}

export interface IValidatorContent {
  pending: {
    [key: string]: string
  },
  wrong: {
    [key: string]: string
  },
  right: {
    [key: string]: string
  },
}

export interface Data {
  course: string | undefined
  exercise: string | undefined
  solution: string | undefined
  errors?: string | undefined
  exerciseDependencies?: string | undefined
  description: string | undefined
  video: string | undefined
  hints: string | undefined
  supports: Record<string, string | undefined>
  questions: Question[],
  validatorContent: IValidatorContent
}

export const Chapter = () => {
  const [time, setTime] = useState({
    value: 0,
  })
  const [validatorState, setValidatorState] = useState(PENDING)
  const [showDiff, setShowDiff] = useState(false)
  const [isAccount, setIsAccount] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState<Data>({
    course: undefined,
    exercise: undefined,
    solution: undefined,
    errors: undefined,
    exerciseDependencies: undefined,
    description: undefined,
    video: undefined,
    hints: undefined,
    supports: {},
    questions: [],
    validatorContent: {
      pending: {},
      right: {},
      wrong: {}
    }
  })
  const [tab, setTab] = useState<string>(TabType.CONTENT)
  const [percent, setPercent] = useState(0)
  const [stateChapter, setStateChapter] = useState({
    previousChapter: '/',
    nextChapter: '/',
  })
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)



  let intervalID: any = useRef(null)
  const partCurrentUrl = pathname.split('/')[1]
  const findLocalCourse = courseData.find((course) => course.path === partCurrentUrl)

  const infoCourses = getCoursesData((user && user.courses) || COURSES);
  const additionalInfo: IAdditionalInfo = infoCourses.courses[findLocalCourse?.name || '']

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

    courseData.forEach((course: CourseData) => {
      const index = course.path!
      chaptersByCourse[index].forEach((chapter: ChapterData) => {
        if (pathname === chapter.pathname)
          setData({
            course: chapter.data.course,
            exercise: chapter.data.exercise,
            solution: chapter.data.solution,
            supports: chapter.data.supports,
            errors: chapter.data.exercise,
            exerciseDependencies: chapter.data.exerciseDependencies,
            description: chapter.data.description,
            video: chapter.data.video,
            hints: chapter.data.hints,
            questions: chapter.data.questions.map((question) => {
              return { ...question, proposedResponses: [] }
            }),
            validatorContent: chapter.data.validatorContent,
          })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const getPercent = (chapterData: ChapterData[]) => {
    chapterData.forEach((chapter, i) => {
      if (pathname === chapter.pathname) {
        if (i - 1 >= 0) {
          setStateChapter((prev) => ({
            ...prev,
            previousChapter: chapterData[i - 1].pathname,
          }))
        }

        if (i + 1 < chapterData.length) {
          setStateChapter((prev) => ({
            ...prev,
            nextChapter: chapterData[i + 1].pathname,
          }))
        } else {
          if (user) {
            setStateChapter((prev) => ({
              ...prev,
              nextChapter: `/profile/certificates`,
            }))
          } else {
            setStateChapter((prev) => ({
              ...prev,
              nextChapter: '/sign-up',
            }))
          }
        }

        if (i !== chapterData.length) {
          setPercent(() => ((i + 1) / chapterData.length) * 100)
        } else setPercent(() => 100)
      }
    })
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

  useEffect(() => {
    if (findLocalCourse && findLocalCourse.name === CourseNameType.CHAINLINK_101) {
      getPercent(ChainlinkIntroductionChapters)
    } else if (findLocalCourse && findLocalCourse.name === CourseNameType.SOLIDITY_INTRO) {
      getPercent(SolidityIntroductionChapters)
    } else {
      getPercent(vrfIntroductionChapters)
    }
    // eslint-disable-next-line
  }, [])

  const findCurrentCourse = (user: PublicUser) => {
    let course = null
    const { courses } = user

    if (findLocalCourse) {
      course = courses?.find((course) => course.title === findLocalCourse?.name)

      return {
        ...course,
        path: findLocalCourse.path
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

  const validateCallback = () => {

    const codeToCompile = data.exerciseDependencies ?
      data.exerciseDependencies.concat(data.exercise!.split('\n').filter(row => !row.match('import')).join('\n')) :
      data.exercise

    if (!showDiff) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/compile`, {
        body: JSON.stringify({ data: codeToCompile }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then((response) => response.json())
        .then(({ data }) => {
          if (JSON.parse(data).errors) {
            setData(currentState => ({
              ...currentState,
              errors: currentState.errors + '\n' + JSON.parse(data).errors.join('\n'),
            }))
          }
        })
        .catch(error => error)
    }

    if (stateChapter.nextChapter === `/profile/certificates` || additionalInfo.progress.length === additionalInfo.countChapters - 1) {
      setValidatorState(RIGHT)
      if (user) {
        clearInterval(intervalID.current)
        const course = findCurrentCourse(user)

        dispatch(
          addProgress({
            chapterDone: pathname,
            courseId: course ? course._id : '',
            time: time.value,
            isCompleted: course.progress.length === additionalInfo.countChapters - 1,
            coursePath: course ? course.path : ''
          }),
        )
      }
      setIsAccount(true)
      return
    }

    if (data.questions.length > 0) {
      let ok = true
      data.questions.forEach((question) => {
        if (!question.proposedResponses) ok = false
        else {
          question.responses.forEach((response) => {
            if (!(question.proposedResponses && question.proposedResponses.includes(response))) ok = false
          })
          question.proposedResponses.forEach((proposedResponse) => {
            if (!(question.responses.includes(proposedResponse))) ok = false
          })
        }
        if (question.responses.length === 0) ok = true
      })
      if (ok) {
        setValidatorState(RIGHT)
        setIsAccount(true)
        if (user) {
          clearInterval(intervalID.current)
          const course = findCurrentCourse(user)
          dispatch(
            addProgress({
              chapterDone: pathname,
              courseId: course ? course._id : '',
              time: time.value,
              isCompleted: false,
              coursePath: course.path
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
          if (
            // @ts-ignore
            data.exercise.replace(/\s+|\/\/ Type your solution below/g, '') ===
            // @ts-ignore
            data.solution.replace(/\s+|\/\/ Type your solution below/g, '')
          ) {
            setValidatorState(RIGHT)
            setIsAccount(true)
            if (user) {
              clearInterval(intervalID.current)
              const course = findCurrentCourse(user)
              dispatch(
                addProgress({
                  chapterDone: pathname,
                  courseId: course ? course._id : '',
                  time: time.value,
                  isCompleted: false,
                  coursePath: course.path
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
    setData({ ...data, exercise: e, errors: e })
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
          solution={showHint ? data.solution : data.exercise}
          proposedSolution={showDiff && !showHint ? data.errors : data.exercise}
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
          nextChapter={stateChapter.nextChapter}
          previousChapter={stateChapter.previousChapter}
          isStarted={isStarted}
          percent={percent}
          startedHandler={startTaskHandler}
          proposedQuestionAnswerCallback={proposedQuestionAnswerCallback}
          currentCourse={user ? findCurrentCourse(user) : null}
          additionalInfo={additionalInfo}
          setShowHint={setShowHint}
        />
      )}
      {/* <Footer percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} /> */}
    </>
  )
}
