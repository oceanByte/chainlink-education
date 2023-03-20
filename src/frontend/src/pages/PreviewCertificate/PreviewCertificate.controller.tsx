import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { jsPDF } from 'jspdf'

import { State } from 'reducers'

import { FooterView } from '../../app/App.components/Footer/Footer.view'
import Header from '../../app/App.components/Header/Header.controller'
import { PreviewCertificateView } from './PreviewCertificate.view'

import { CourseID } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { IAdditionalInfo } from 'helpers/coursesInfo'
import { CourseStatusType } from 'pages/Course/Course.data'
import { Error404 } from 'pages/Error404/Error404.controller'
import { getPathForCertificate } from 'helpers/getInfoForCourse'
import { getCertificate } from './PreviewCertificate.actions'
import { Course } from 'shared/course'


export const PreviewCertificate = () => {
  const courses = useSelector((state: State) => state.courses)

  const dispatch = useDispatch()
  const { courseId, username } = useParams<CourseID>();

  const isPublicView = !!username
  const user = useSelector((state: State) => state.auth.user)
  const certificate = useSelector((state: State) => state.certificate.certificate)

  const infoCourses = user?.courses ?? courses;
  const currentCourse = courses.find((course: Course) => course.urlCourse === courseId);
  const additionalInfo: IAdditionalInfo = (infoCourses as any).find((i: Course) => i.title === currentCourse.title)


  const downloadCallback = (title: string) => {
    const path = getPathForCertificate(title)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [380, 480],
    })
    doc.addImage(path, 'JPEG', 0, 0, 380, 480)
    doc.setFontSize(16)
    doc.setTextColor('#3d4556')
    doc.text(user?.username || '', 300, 380, { align: 'center' })
    doc.setFontSize(12)
    doc.text(certificate?.code || '', 190, 450, { align: 'center' })
    doc.save('chainlink_academy_certificate.pdf')
  }

  useEffect(() => {
    if (isPublicView) {
      dispatch(getCertificate({ username: username || '', coursePath: courseId }))
    } else {
      dispatch(getCertificate({
        username: user ? user.username : '',
        coursePath: courseId,
        courseId: additionalInfo ? additionalInfo._id : ''
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!certificate && !user) {
    return (
      <>
        <Header />
        <Error404 />
        <FooterView />
      </>
    )
  }

  if (!additionalInfo || (additionalInfo.status !== CourseStatusType.COMPLETED && !isPublicView)) {
    return (
      <>
        <Header />
        <Error404 />
        <FooterView />
      </>
    )
  }


  return (
    <>
      <Header />
      <PreviewCertificateView
        isPublicView={isPublicView}
        certificate={certificate}
        additionalInfo={additionalInfo}
        downloadCallback={downloadCallback}
      />
      <FooterView />
    </>
  )
}
