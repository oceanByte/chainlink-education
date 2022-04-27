import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { jsPDF } from 'jspdf'

import { State } from 'reducers'

import { FooterView } from '../../app/App.components/Footer/Footer.view'
import { Header } from '../../app/App.components/Header/Header.controller'
import { PreviewCertificateView } from './PreviewCertificate.view'

import { CourseID } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { getCoursesData, IAdditionalInfo } from 'helpers/coursesInfo'
import { courseData, CourseStatusType } from 'pages/Course/Course.data'
import { COURSES } from 'pages/Home/Home.view'
import { Error404 } from 'pages/Error404/Error404.controller'
import { getPathForCertificate } from 'helpers/getInfoForCourse'
import { getCertificate } from './PreviewCertificate.actions'


export const PreviewCertificate = () => {
  const dispatch = useDispatch()
  const { courseId, username } = useParams<CourseID>();
  const isPublicView = !!username
  const user = useSelector((state: State) => state.auth.user)
  const certificate = useSelector((state: State) => state.certificate.certificate)

  const infoCourses = getCoursesData((user && user.courses) || COURSES);
  const currentCourse = courseData.find((course) => course.path === courseId);
  const additionalInfo: IAdditionalInfo = infoCourses.courses[currentCourse?.name || '']

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
    doc.text(certificate?.code|| '', 190, 450, { align: 'center' })
    doc.save('chainlink_academy_certificate.pdf')
  }
  console.log(certificate);
  useEffect(() => {
    if (isPublicView) {
      dispatch(getCertificate({ username: username || '', coursePath: courseId }))
    } else {
      dispatch(getCertificate({ username: user ? user.username : '', coursePath: courseId }))
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!certificate) {
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
