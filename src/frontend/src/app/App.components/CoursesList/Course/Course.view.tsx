import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Formik } from 'formik';
import classNames from 'classnames'
import * as Yup from 'yup';

import { course as ChainlinkIntroduction } from '../../../../pages/Courses/chainlinkIntroduction'
import { course as SolidityIntroduction } from '../../../../pages/Courses/solidityIntroduction'
import { course as vrfIntroduction } from '../../../../pages/Courses/vrfIntroduction'

import { chapterData as ChainlinkIntroductionChapters } from '../../../../pages/Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { chapterData as SolidityIntroductionChapters } from '../../../../pages/Courses/solidityIntroduction/Chapters/Chapters.data'
import { chapterData as vrfIntroductionChapters } from '../../../../pages/Courses/vrfIntroduction/Chapters/Chapters.data'

import { PublicUser } from 'shared/user/PublicUser'
// import { Option } from '../../Select/Select.view'
import { ChaptersListView } from 'app/App.components/ChaptersList/ChaptersListView'
import { Course } from 'shared/course'
import { CourseNameType } from 'pages/Course/Course.data'
import { InputField } from 'app/App.components/Form/InputField/Input.controller';


interface ICourseView {
  course: Course
  user?: PublicUser,
  copyToClipboard: () => void,
  downloadCallback: () => void,
  getCertificateCallback: (values: { name: string }) => void
}

export const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('This field is required!'),
});

export const CourseView = ({ course, user, downloadCallback, getCertificateCallback, copyToClipboard }: ICourseView) => {
  const [percent, setPercent] = useState(0)
  const [coursePath, setActiveCoursePath] = useState('')
  const [isCertificate, setIsCertificate] = useState(false);
  const { pathname } = useLocation()

  const initialValue = {
    name: user? user?.username : ''
  }

  const handleSubmit = (values: { name: string }) => {
    getCertificateCallback(values);
  }

  useEffect(() => {
    const courseProgress = course && course.progress.length

    if (courseProgress === ChainlinkIntroductionChapters.length) {
      setIsCertificate(() => true)
    }

    if (course && course.title === CourseNameType.CHAINLINK_101) {
      setPercent(() => Math.floor((courseProgress / ChainlinkIntroductionChapters.length) * 100))
      setActiveCoursePath(() => ChainlinkIntroduction.path)
    } else if (course && course.title === CourseNameType.SOLIDITY_INTRO) {
      setPercent(() => Math.floor((courseProgress / SolidityIntroductionChapters.length) * 100))
      setActiveCoursePath(() => SolidityIntroduction.path)
    } else {
      setPercent(() => Math.floor((courseProgress / vrfIntroductionChapters.length) * 100))
      setActiveCoursePath(() => vrfIntroduction.path)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="profile-page-section__header h-font">Progress {course.title}</div>

      <div className="profile-page-progress__bar">
        <div className="profile-page-progress__bar__line">
          <div className="profile-page-progress__bar__line__color" style={{ width: `${percent}%` }} />
        </div>
        <div className="profile-page-progress__bar__number">{percent}%</div>
      </div>
      <div className="profile-page-progress-chapters p-font">
        <ChaptersListView user={user} coursePath={coursePath} course={course} pathname={pathname} />
      </div>
      {course.title === CourseNameType.CHAINLINK_101 ? (
        <>
          <div className="profile-page-progress__certificate-header h-font">Certificate</div>
          {!isCertificate ? (
            <div className="profile-page-progress__warning">
              You cannot download the certificate yet because you have not completed the course
            </div>
          ) : null}

          {user && user.name ? (
            <div className="profile-page-progress-footer-box p-font">
              <button onClick={downloadCallback} className={classNames(
                'profile-page-progress-footer-box__button',
                'btn',
                'btn-green',
                !isCertificate && 'btn-green-disabled')}>
                <span className="profile-page-progress-footer-box__button__text"> Download certificate </span>
                <span className="arrow-upright" />
              </button>
              <div onClick={copyToClipboard} className="profile-page-progress-footer-box__copy-link">Copy certificate link</div>
            </div>
          ) : (
            <div className="profile-page-progress-footer-box p-font">
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
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form className="profile-page-account-info__form" onSubmit={handleSubmit}>
                      <button
                        type='submit'
                        className={classNames(
                        'profile-page-progress-footer-box__button',
                        'btn',
                        'btn-green',
                        !isCertificate && 'btn-green-disabled')}>
                        <span className="profile-page-progress-footer-box__button__text"> Issue certificate </span>
                      </button>
                      <div className='profile-page-account-info__name p-font'>
                        <InputField
                          label=""
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          inputStatus={
                            errors.name && touched.name
                              ? 'error' : !errors.name && touched.name 
                              ? 'success' : undefined
                            }
                          errorMessage={errors.name && touched.name && errors.name}
                          isDisabled={!isCertificate}
                        />
                      </div>
                    </form>
                )}
              </Formik>
            </div>
          )}
          <div className={classNames("profile-page-progress__image", isCertificate && "isCertificate")} />
        </>
      ) : null}
    </>
  )
}
