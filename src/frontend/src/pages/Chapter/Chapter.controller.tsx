import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { getUser } from 'pages/User/User.actions'
import { State } from 'reducers'

import { CourseData } from '../Course/Course.controller'
import { chaptersByCourse, courseData } from '../Course/Course.data'
import { chapterData } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { addProgress } from './Chapter.actions'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
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

export interface Data {
  course: string | undefined
  exercise: string | undefined
  solution: string | undefined
  supports: Record<string, string | undefined>
  questions: Question[]
}

export const Chapter = () => {
  const [validatorState, setValidatorState] = useState(PENDING)
  const [showDiff, setShowDiff] = useState(false)
  const [isPopup, setIsPopup] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState<Data>({
    course: undefined,
    exercise: undefined,
    solution: undefined,
    supports: {},
    questions: [],
  })
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)
  let previousChapter = '/'
  let nextChapter = '/'
  let percent = 0

  let badgeUnlocked = false
  let counter = 0
  user?.progress?.forEach((chapter) => {
    counter++
  })
  if (counter >= 20) badgeUnlocked = true

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
            questions: chapter.data.questions.map((question) => {
              return { ...question, proposedResponses: [] }
            }),
          })
      })
    })
  }, [pathname])

  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {
      if (i - 1 >= 0) previousChapter = chapterData[i - 1].pathname
      percent = 0
      if (i + 1 < chapterData.length) {
        nextChapter = chapterData[i + 1].pathname
      } else {
        if (user) nextChapter = `/profile`
        else nextChapter = '/sign-up'
      }
      if (i !== 7) percent = ((i + 1) / chapterData.length) * 100
      else percent = 100
    }
  })

  const validateCallback = () => {
    if (pathname === '/chainlinkIntroduction/chapter-8') {
      setValidatorState(RIGHT)
      if (user) dispatch(addProgress({ chapterDone: pathname }))
      setIsPopup(true)
      return
    }

    if (data.questions.length > 0) {
      let ok = true
      data.questions.forEach((question) => {
        if (!question.proposedResponses) ok = false
        else {
          question.responses.forEach((response) => {
            if (!(question.proposedResponses && question.proposedResponses.indexOf(response) >= 0)) ok = false
          })
          question.proposedResponses.forEach((proposedResponse) => {
            if (!(question.responses.indexOf(proposedResponse) >= 0)) ok = false
          })
        }
        if (question.responses.length === 0) ok = true
      })
      if (ok) {
        setValidatorState(RIGHT)
        setIsPopup(true)
        if (user) dispatch(addProgress({ chapterDone: pathname }))
        else dispatch(showToaster(SUCCESS, 'Register to save progress', 'and get your completion certificate'))
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
            setIsPopup(true)
            if (user) dispatch(addProgress({ chapterDone: pathname }))
            else dispatch(showToaster(SUCCESS, 'Register to save progress', 'and get your completion certificate'))
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

  // console.log(`%c percent ${percent}`, 'padding: 20px; color: orange; background: lightgreen; border-radius: 20px')
  // console.log(`%c nextChapter ${nextChapter}`, 'padding: 20px; color: red; background: coral; border-radius: 20px')
  // console.log(
  //   `%c previousChapter ${previousChapter}`,
  //   'padding: 20px; color: aqua; background: black; border-radius: 20px',
  // )

  return (
    <>
      {data.course && (
        <ChapterView
          validatorState={validatorState}
          validateCallback={validateCallback}
          solution={data.solution}
          proposedSolution={data.exercise}
          proposedSolutionCallback={proposedSolutionCallback}
          showDiff={showDiff}
          isPopup={isPopup}
          course={data.course}
          closeIsPopup={() => setIsPopup(false)}
          user={user}
          supports={data.supports}
          questions={data.questions}
          nextChapter={nextChapter}
          previousChapter={previousChapter}
          isStarted={isStarted}
          percent={percent}
          startedHandler={startTaskHandler}
          proposedQuestionAnswerCallback={proposedQuestionAnswerCallback}
        />
      )}
      {/* <Footer percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} /> */}
    </>
  )
}
