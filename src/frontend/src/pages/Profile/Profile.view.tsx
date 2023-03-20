import * as React from 'react'
import { useState, useCallback } from 'react'
import { Switch, NavLink, Route } from 'react-router-dom'

import { PublicUser } from 'shared/user/PublicUser'

import { ConfirmYouPassword } from '../../app/App.components/ConfirmYouPassword/ConfirmYouPassword'
import { UpdatePassword } from '../../app/App.components/UpdatePassword/UpdatePassword'
import { Certificates } from 'app/App.components/Profile/Certificates/Certificates.controller';
import { OverallProgress } from 'app/App.components/Profile/OverallProgress/OveralProgress.controller';
import { AccountInfo } from 'app/App.components/Profile/AccountInfo/AccountInfo.view';
import { CourseProgress } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { Error404 } from 'pages/Error404/Error404.controller'
import { IChangeUsernameEmail } from './Profile.controller'
import { useSelector } from 'react-redux'
import { State } from 'reducers'
import { IAdditionalInfo } from 'helpers/coursesInfo'

type ProfileViewProps = {
  user?: PublicUser,
  changeEmailOrUsernameCallback: ({ email, username }: IChangeUsernameEmail) => void,
  deleteAccountCallback: () => void
}

export const ProfileView = ({
  user,
  changeEmailOrUsernameCallback,
  deleteAccountCallback,
}: ProfileViewProps) => {
  const [isShow, setIsShow] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(true)
  const courses = useSelector((state: State) => state.courses)

  const showSubList = useCallback((isShow: boolean) => {
    setIsShow(() => isShow)
  }, [])

  return (
    <div className='profile-page'>
      <div className='profile-page-sections'>
        <div className='profile-page-sections-content'>
          <NavLink
            to={`/profile/progress`}
            className={`profile-page-sections-content__item profile-item-progress`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Progress</div>
          </NavLink>
          {user && isShow ? (
            <div className='progress-courses__wrapper'>
              {courses ? courses.map((course: IAdditionalInfo, index: number) => {
                return (
                  <div className='progress-courses__item' key={course.title}>
                    <NavLink
                      to={`/profile/progress/${courses[index].urlCourse}`}
                      className={`profile-page-sections-content__item profile-item-progress`}
                    >
                      {course.title}
                    </NavLink>
                  </div>
                )
              }) : null}
            </div>
          ) : null}
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/certificates`}
            className={`profile-page-sections-content__item profile-item-certificate`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Certificate</div>
          </NavLink>
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/account-info`}
            className={`profile-page-sections-content__item profile-item-info`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </NavLink>
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/reset-password`}
            className={`profile-page-sections-content__item profile-item-reset`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </NavLink>
        </div>
      </div>
      <div className={`profile-page-progress profile-page-section profile-page-visible`}>
        <Switch>
          <Route path={`/profile/progress`} exact>
            <OverallProgress user={user} courses={courses} />
          </Route>
          <Route path={`/profile/progress/:courseId`} exact>
            <CourseProgress user={user} courses={courses} showSubList={showSubList} />
          </Route>
          <Route path={`/profile/certificates`}>
            <Certificates user={user} />
          </Route>
          <Route path={`/profile/account-info`}>
            <AccountInfo
              user={user}
              changeEmailOrUsernameCallback={changeEmailOrUsernameCallback}
              deleteAccountCallback={deleteAccountCallback}
            />
          </Route>
          <Route path={`/profile/reset-password`}>
            <UpdatePassword setShowModal={setIsConfirmPassVisible} />
            <ConfirmYouPassword showModal={isConfirmPassVisible} setShowModal={setIsConfirmPassVisible} />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
        {/* <CoursesListView
          user={user}
          copyToClipboard={copyToClipboard}
          downloadCallback={downloadCallback}
          getCertificateCallback={getCertificateCallback}
        /> */}
      </div>
    </div>
  )
}
