import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { State } from 'reducers'

import { Footer } from '../../app/App.components/Footer/Footer.controller'
import Header from '../../app/App.components/Header/Header.controller'
import { DescriptionCourseView } from './DescriptionCourse.view'

import { CourseID } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { IAdditionalInfo } from 'helpers/coursesInfo'

import { getUser } from '../Profile/Profile.actions'

import { changeAddress, setNftCertificate } from '../Profile/Profile.actions'
import { getCourseByURL } from 'app/App.components/CourseCard/CourseCard.action'

export const DescriptionCourse = () => {
  const { courseId } = useParams<CourseID>()
  const course: IAdditionalInfo = useSelector((state: State) => state?.courses?.find((i: IAdditionalInfo) => i.urlCourse === courseId) ?? {})
  const user = useSelector((state: State) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.username) {
      dispatch(getUser({ username: user.username }));
    }
    dispatch(getCourseByURL(courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeAddressCallback = async ({ address }: any) => {
    if (address) {
      dispatch(changeAddress({ address: address }))
    }

    dispatch(getUser({ username: user ? user.username : '' }))
  }

  const setNftCertificateCallback = async ({ coursePath }: any): Promise<boolean> => {
    if (coursePath) {
      await dispatch(
        setNftCertificate({ coursePath: coursePath, address: '0x69A107c851A1e1F7a7cf1914fb1eb183Fb2614F5' }),
      )
      return true
    }

    return false
  }



  return (
    <>
      <Header />
      <DescriptionCourseView
        user={user}
        additionalInfo={course}
        changeAddressCallback={changeAddressCallback}
        setNftCertificateCallback={setNftCertificateCallback}
      />
      <Footer />
    </>
  )
}
