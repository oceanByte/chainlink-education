import * as React from 'react'

type ProfileViewProps = {

}

export const ProfileView = () => {
  return (
    <div className="profile-page">
      <div className='profile-page-sections'>
        <div className='profile-page-sections-content'>
          <div className='profile-page-sections-content__item profile-item-progress'>
            <div className='profile-icon' />
            <div className='profile-text'>Progress & Certificate</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div className='profile-page-sections-content__item profile-item-info'>
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div className='profile-page-sections-content__item profile-item-reset'>
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </div>
        </div>
      </div>
    </div>
  )
}