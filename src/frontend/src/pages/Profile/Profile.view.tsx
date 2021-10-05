import * as React from 'react'
import { useState } from 'react'
import { ResetPassword } from '../ResetPassword/ResetPassword.controller'

type ProfileViewProps = {}

export const ProfileView = () => {
  const [section, setSection] = useState(1);

  return (
    <div className='profile-page'>
      <div className='profile-page-sections'>
        <div className='profile-page-sections-content'>
          <div onClick={() => setSection(1)} className={`profile-page-sections-content__item profile-item-progress ${section === 1 ? "profile-item-selected" : ""}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Progress & Certificate</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(2)} className={`profile-page-sections-content__item profile-item-info ${section === 2 ? "profile-item-selected" : ""}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(3)} className={`profile-page-sections-content__item profile-item-reset ${section === 3 ? "profile-item-selected" : ""}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </div>
        </div>
      </div>
      <div className={`profile-page-progress profile-page-section ${section === 1 ? "profile-page-visible" : ""}`}>
        <div className='profile-page-section__header h-font'>Progress</div>
        <div className='profile-page-progress__bar'>
          <div className='profile-page-progress__bar__line' />
          <div className='profile-page-progress__bar__number'>100%</div>
        </div>
        <div className='profile-page-progress-chapters p-font'>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 1: What will this course cover?</span>
            <div className='profile-page__chapter-completion completed'>COMPLETED</div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 2: What are Contracts?</span>
            <div className='profile-page__chapter-completion completed'>COMPLETED</div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 3: Digital Agreements - What we have today</span>
            <div className='profile-page__chapter-completion continue'>CONTINUE</div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 4: Blockchain Introduction</span>
            <div className='profile-page__chapter-completion'></div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 5: How Blockchains Work Intro</span>
            <div className='profile-page__chapter-completion'></div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 6: Smart Contracts - The Future</span>
            <div className='profile-page__chapter-completion'></div>
          </div>
          <div className='profile-page-progress-chapters__item'>
            <span className='profile-page__chapter-name'>Chapter 7: The Smart Contract Connectivity Problem</span>
            <div className='profile-page__chapter-completion'></div>
          </div>
          <div className='profile-page-progress-chapters__item no-bb'>
            <span className='profile-page__chapter-name'>Chapter 8: Centralized Oracles</span>
            <div className='profile-page__chapter-completion'></div>
          </div>
        </div>
        <div className='profile-page-progress__certificate-header h-font'>
          Certificate
        </div>
        <div className='profile-page-progress__warning'>You cannot upload the certificate yet because you have
          not completed the course
        </div>
        <div className='profile-page-progress-footer-box p-font'>
          <button className='profile-page-progress-footer-box__button btn btn-green btn-green-disabled'>
            <span className='profile-page-progress-footer-box__button__text'> Get started for FREE </span>
            <span className='arrow-upright' />
          </button>
          <div className='profile-page-progress-footer-box__copy-link'>
            Copy certificate link
          </div>
        </div>
        <div className='profile-page-progress__image' />
      </div>
      <div className={`profile-page-account-info profile-page-section ${section === 2 ? "profile-page-visible" : ""}`}>
        <div className='profile-page-section__header h-font'>Account info</div>

      </div>
      <div className={`profile-page-reset-password profile-page-section ${section === 3 ? "profile-page-visible" : ""}`}>
        <ResetPassword />
      </div>
    </div>
  )
}