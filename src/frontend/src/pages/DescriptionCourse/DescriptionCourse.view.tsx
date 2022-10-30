import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Markdown from 'markdown-to-jsx'

import { PublicUser } from 'shared/user/PublicUser'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { InputField } from 'app/App.components/Form/InputField/Input.controller'
import { ChapterH1, GradientTextWrapper, RegularP } from './DescriptionCourse.style'
import { ChapterData } from 'pages/Chapter/Chapter.controller'
import classnames from 'classnames'
import { BadgeView } from 'app/App.components/Badge/Badge.view'
import { CourseStatusType } from 'pages/Course/Course.data'

import { Difficulty } from 'app/App.components/CourseCard/Difficulty/Difficulty.view'
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view'
import { CircularProgressBar } from 'app/App.components/CircleProgressBar/CircleProgressBar.view'
import { ShareCertificate } from 'app/App.components/ShareCertificate/ShareCertificate.view'
import { UseCertificate } from 'app/App.components/CourseCard/UseCertificate/UseCertificate.view'
import { IAdditionalInfo } from 'helpers/coursesInfo'

type DescriptionCourseViewProps = {
  user?: PublicUser
  additionalInfo: IAdditionalInfo
}

export const Content = ({ course }: any) => (
  <Markdown
    children={course}
    options={{
      overrides: {
        p: {
          component: RegularP,
        },
        h1: {
          component: ChapterH1,
        },
        GradientTextWrapp: {
          component: GradientTextWrapper,
        },
      },
    }}
  />
)

const user: any = {}

const initialValue = {
  address: user ? user?.address : '',
}

const handleSubmit = (values: { address: string }) => {
  let newValues = {}

  if (values.address !== user?.address) {
    newValues = {
      ...newValues,
      address: values.address,
    }
  }

  changeEmailOrUsernameCallback(newValues)
}

const changeEmailOrUsernameCallback = (values: any): void => {}

interface IChapterItem {
  chapter: ChapterData
  index: number
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('This field is required!'),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers and underscores')
    .min(2, 'Username must be longer than or equal to 2 characters')
    .max(50, 'Username must be shorter than or equal to 50 characters')
    .required('This field is required!'),
})

const ChapterItem = ({ chapter, index }: IChapterItem) => {
  const content = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const [isShow, setIsShow] = useState(false)
  const [height, setHeight] = useState('0px')
  const toggle = () => {
    setIsShow((prev) => !prev)
    setHeight(() => (isShow ? '0px' : `${content.current?.scrollHeight}px`))
  }

  return (
    <div className="chapter">
      <div className={classnames('chapter-main', isShow && 'open')} onClick={toggle}>
        <div className="chapter-main__number">Chapter {index + 1}:</div>
        <div className="chapter-main__name">{chapter.name}</div>
        <div className="arrow-down" />
      </div>
      <div
        ref={content}
        style={{
          maxHeight: `${height}`,
        }}
        className={classnames('chapter-description')}
      >
        <Content course={chapter.data.description} />
        <button className="chapter-view__chapter" type="button" onClick={() => history.push(chapter.pathname)}>
          View Chapter
        </button>
      </div>
    </div>
  )
}

export const DescriptionCourseView = ({ user, additionalInfo }: DescriptionCourseViewProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const [isShowList, setIsShowList] = useState(false)

  const showList = () => {
    setIsShowList((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowList(() => false)
      }
    }
    if (isShowList) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isShowList])

  return (
    <div className="description-page">
      <div className={`description-page-section section-chapters`}>
        <Content course={additionalInfo.descriptionCourse} />

        <div className="program-wrapp">Сourse program</div>
        <div className="chapters">
          {additionalInfo.chapters.map((chapter: ChapterData, index: number) => (
            <React.Fragment key={index}>
              <ChapterItem chapter={chapter} index={index} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="description-page-section section-info">
        <div className="badge-container">
          <BadgeView
            hasLargeBadge
            percentage={additionalInfo.percent}
            isCompleted={additionalInfo.status === CourseStatusType.COMPLETED}
            title={additionalInfo.title}
          />
        </div>

        <div className="description-page-section section-survey">
          <h2> Get involved </h2>
          <p> Tell us how to improve the academy (2min)</p>
          <div>
            <MainButtonView
              isCompleted
              isSecondary
              hasArrowUpRight
              text="Take the survey"
              onClick={() => history.push(`/${additionalInfo.urlCourse}/certificate/preview`)}
              loading={false}
              disabled={false}
            />
          </div>
        </div>
        <div className="additional-info">
          <div className="additional-info__chapters item">
            <div className="title">Number of chapters</div>
            <div className="wrapp">
              <div className="icon" />
              <div>{additionalInfo.countChapters} chapters</div>
            </div>
          </div>
          <div className="additional-info__time item">
            <div className="title">Amount of time</div>
            <div className="wrapp">
              <div className="icon" />
              <div>{additionalInfo.amountOfTime}</div>
            </div>
          </div>
          <div className="additional-info__difficulty item">
            <div className="title">Level of difficulty</div>
            <Difficulty difficulty={additionalInfo.difficulty} />
          </div>
        </div>
        <div className="additional-info-mobile">
          <div className="additional-info__chapters item">
            <div className="icon" />
            <div>{additionalInfo.countChapters} chapters</div>
          </div>
          <div className="additional-info__time item">
            <div className="icon" />
            <div>{additionalInfo.amountOfTime}</div>
          </div>
          <div className="additional-info-mobile__difficulty">
            <Difficulty difficulty={additionalInfo.difficulty} />
          </div>
        </div>
        <div className="additional-info__footer ">
          {user ? (
            <div
              className={classnames(
                'course-footer',
                !additionalInfo.percent && 'center',
                additionalInfo.percent === 100 && 'completed',
              )}
            >
              <div className="course-btn-wrapper">
                {!additionalInfo.percent ? (
                  <MainButtonView
                    isPrimary
                    hasArrowUpRight
                    text="Start Course Now"
                    onClick={() => history.push(`${additionalInfo.urlChapter}`)}
                    loading={false}
                    disabled={false}
                  />
                ) : null}
                {additionalInfo.percent && additionalInfo.percent !== 100 ? (
                  <MainButtonView
                    isPrimary
                    hasArrowUpRight
                    text="Continue Course"
                    onClick={() => history.push(`${additionalInfo.urlChapter}`)}
                    loading={false}
                    disabled={false}
                  />
                ) : null}
                {additionalInfo.percent && additionalInfo.percent === 100 ? (
                  <>
                    <div ref={wrapperRef} className="useCertificate">
                      <MainButtonView
                        isCompleted
                        isPrimary
                        hasArrowDown
                        text="Use certificate"
                        onClick={showList}
                        loading={false}
                        disabled={false}
                        className={isShowList ? 'hasArrowUp' : ''}
                      />
                      <UseCertificate
                        isSecondary
                        isShowList={isShowList}
                        additionalInfo={additionalInfo}
                        nextPath={`/${additionalInfo.urlCourse}/certificate/preview`}
                      />
                    </div>
                    <div className="profile-page-account-info__username p-font">
                      <div>
                        <Formik
                          enableReinitialize
                          initialValues={initialValue}
                          validationSchema={ValidationSchema}
                          onSubmit={handleSubmit}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid,
                          }) => (
                            <form className="profile-page-account-info__form" onSubmit={handleSubmit}>
                              <div className="input-address">
                                <InputField
                                  label="Please enter your Polygon Address to issue your NFT"
                                  type="text"
                                  placeholder="0xb0897686c545045aFc77CF20eC7A532E3120E0F1"
                                  value={values.address || ''}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="address"
                                  inputStatus={errors.address && touched.address ? 'error' : undefined}
                                  errorMessage={errors.address && touched.address && errors.address}
                                  isDisabled={false}
                                />
                              </div>
                            </form>
                          )}
                        </Formik>
                      </div>
                      <div className="issueCertificate">
                        <MainButtonView
                          isCompleted
                          isPrimary
                          hasNftRight
                          text="Issue NFT Certificate"
                          onClick={() => history.push(`/${additionalInfo.urlCourse}/certificate/preview`)}
                          loading={false}
                          disabled={false}
                        />
                      </div>
                    </div>

                    {/* <div className='downloadCertificate'>
                      <MainButtonView
                        isCompleted
                        isPrimary
                        hasArrowDown
                        text='Download certificate'
                        onClick={() => history.push(`/${additionalInfo.urlCourse}/certificate/preview`)}
                        loading={false}
                        disabled={false}
                      />
                    </div> */}
                  </>
                ) : null}
              </div>

              {additionalInfo.percent && additionalInfo.percent !== 100 ? (
                <div className="course-footer__progress-bar">
                  <div className="circle-wrap">
                    <CircularProgressBar strokeWidth="7" sqSize="60" percentage={additionalInfo.percent} />
                  </div>
                </div>
              ) : null}

              {additionalInfo.percent && additionalInfo.percent === 100 ? (
                // <div className="shareCertificate">
                //   <ShareCertificate
                //     className="isDescription"
                //     username={user.username}
                //     additionalInfo={additionalInfo}
                //   />
                // </div>
                <div></div>
              ) : null}
            </div>
          ) : (
            <MainButtonView
              isPrimary
              hasArrowUpRight
              text="Start Course Now"
              onClick={() => history.push(`${additionalInfo.urlChapter}`)}
              loading={false}
              disabled={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
