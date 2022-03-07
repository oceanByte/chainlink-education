import * as React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Option } from 'app/App.components/Select/Select.view'
import { PublicUser } from 'shared/user/PublicUser'

import { ConfirmYouPassword } from '../../app/App.components/ConfirmYouPassword/ConfirmYouPassword'
import { UpdatePassword } from '../../app/App.components/UpdatePassword/UpdatePassword'
import { chapterData } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'
import { CoursesListView } from 'app/App.components/CoursesList/CourseList.view'
import { DeleteAccountModal } from 'modals/DeleteAccount/DeleteAccount.view'

type ProfileViewProps = {
  user?: PublicUser,
  activeCourse: Option,
  deleteAccountCallback: ()=> void
}

export const ProfileView = ({
  user,
  activeCourse,
  deleteAccountCallback,
}: ProfileViewProps) => {

  const { search, pathname } = useLocation()
  const [section, setSection] = useState(1)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(true)
  const [isDeleteAccVisible, setIsDeleteAccVisible] = useState(false)
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (search) {
      setSection(() => +search[search.length-1])
    }
  }, [search])


  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {

      if (i !== 7){
        setPercent(() => ((i + 1) / chapterData.length) * 100)
      }
      else setPercent(() => 100)
    }
  })

  useEffect(() => {
    if (user && user.progress) {
      const userProgress = user && user.progress.length;
      setPercent(() => Math.floor((userProgress / chapterData.length) * 100))
    }
  }, [])

  const showDeleteAccountModal = () => {
    setIsDeleteAccVisible(() => true)
    deleteAccountCallback()
  }

  const hideDeleteAccountModal = () => {
    setIsDeleteAccVisible(() => false)
  }

  return (
    <div className='profile-page'>
      <div className='profile-page-sections'>
        <div className='profile-page-sections-content'>
          <div onClick={() => setSection(1)}
               className={`profile-page-sections-content__item profile-item-progress ${section === 1 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Progress & Certificate</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(2)}
               className={`profile-page-sections-content__item profile-item-info ${section === 2 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(3)}
               className={`profile-page-sections-content__item profile-item-reset ${section === 3 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </div>
        </div>
      </div>
      <div className={`profile-page-progress profile-page-section ${section === 1 ? 'profile-page-visible' : ''}`}>
        <CoursesListView user={user} />
      </div>
      <div className={`profile-page-account-info profile-page-section ${section === 2 ? 'profile-page-visible' : ''}`}>
        <div className='profile-page-account-info-wrapper'>
          <div className='profile-page-section__header h-font'>Account info</div>
          <div className='profile-page-account-info__username p-font'>
            <label htmlFor='profile-page-account-info__username__input'>Username</label>
            <div>{user?.username}</div>
            {/* <input
              type='text'
              id='profile-page-account-info__username__input'
              name='solution'
            /> */}
          </div>
          {/* <div className='profile-page-account-info__email p-font'>
            <label htmlFor='profile-page-account-info__email__input'>Email address</label> */}
            {/* <div>{user?.email}</div> */}
            {/* <input
              type='email'
              id='profile-page-account-info__email__input'
              name='solution'
            /> */}
          {/* </div> */}
        </div>
        {/* <button className='btn btn-green'>
          <span className='profile-page-account-info__button__text'> Save changes </span>
          <span className='arrow-upright' />
        </button> */}
        <div onClick={showDeleteAccountModal} className='profile-page-account-info__delete-account'>
          Delete your account
        </div>
      </div>
      <div
        className={`profile-page-reset-password profile-page-section ${section === 3 ? 'profile-page-visible' : ''}`}>
        <UpdatePassword setShowModal={setIsConfirmPassVisible} />
      </div>
      <ConfirmYouPassword showModal={isConfirmPassVisible} setShowModal={setIsConfirmPassVisible} />
      {/* <DeleteAccount showModal={isDeleteAccVisible} setShowModal={setIsDeleteAccVisible} /> */}
      <DeleteAccountModal
        open={isDeleteAccVisible}
        onClose={hideDeleteAccountModal}
      />
    </div>
  )
}
