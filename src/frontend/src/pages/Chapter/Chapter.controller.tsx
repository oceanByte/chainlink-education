import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ethers } from "ethers";

import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { getUser } from 'pages/User/User.actions'
import { State } from 'reducers'

import { CourseData } from '../Course/Course.controller'
import { chaptersByCourse, courseData, CourseNameType } from '../Course/Course.data'
import { chapterData as ChainlinkIntroductionChapters } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../Courses/vrfIntroduction/Chapters/Chapters.data'
import { addProgress } from './Chapter.actions'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
import { ChapterView } from './Chapter.view'
import { PublicUser } from 'shared/user/PublicUser'

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

export interface IFormValues {
  ether: string
}

interface IPayment {
  setError: any
  setTxs: any
  ether: string | null
  addr: string | null
}

declare let window: any;


const startPayment = async ({ ether, addr, setTxs, setError }: IPayment) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = addr || ''
    ethers.utils.getAddress(address);
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(ether || '')
    });

    setTxs({
      reqData: {
        ether,
        addr
      },
      resTx: [tx]
    });
  } catch (err) {
    const findSymbol = (err as Error).message.indexOf('(');
    const formatMessage = findSymbol !== -1 ? (err as Error).message.slice(0, findSymbol) : (err as Error).message;
    setError(formatMessage)
  }
};

export const Chapter = () => {
  const [time, setTime] = useState({
    value: 0,
  })
  const [error, setError] = useState(null);
  const [txs, setTxs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validatorState, setValidatorState] = useState(PENDING)
  const [showDiff, setShowDiff] = useState(false)
  const [isAccount, setIsAccount] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState<Data>({
    course: undefined,
    exercise: undefined,
    solution: undefined,
    supports: {},
    questions: [],
  })
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
            questions: chapter.data.questions.map((question) => {
              return { ...question, proposedResponses: [] }
            }),
          })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleSubmit = async (values: IFormValues) => {
    setIsLoading(true);
    await startPayment({
      setError,
      setTxs,
      ether: values.ether,
      addr: process.env.REACT_APP_ADDRESS_RECIPIENT || '0x0A0De0c303E10A18b438f5D5dabDD406f3a99C02'
    });
    setIsLoading(false);
  };

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
              nextChapter: `/profile`,
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
    }
    return course
  }

  const validateCallback = () => {
    if (stateChapter.nextChapter === `/profile`) {
      setValidatorState(RIGHT)
      if (user) {
        clearInterval(intervalID.current)
        const course = findCurrentCourse(user)
        dispatch(
          addProgress({
            chapterDone: pathname,
            courseId: course ? course._id : '',
            time: time.value,
            isCompleted: true,
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
          isAccount={isAccount}
          course={data.course}
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
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          transactionData={txs}
          transactionErrorMessage={error}
        />
      )}
      {/* <Footer percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} /> */}
    </>
  )
}
