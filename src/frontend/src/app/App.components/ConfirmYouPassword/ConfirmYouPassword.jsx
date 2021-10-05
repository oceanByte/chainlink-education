import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EyeHide from '../../../assets/eyeHide.png'
import Eye from '../../../assets/eye.png'
import ArrowRight from '../../../assets/arrowRight.png'
import CloseIcon from '../../../assets/closeicon.png'
import classnames from 'classnames'

export const ConfirmYouPassword = ({ showModal, setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false)

  const classForModal = classnames('confirm-you-password', { 'confirm-you-password-hide': showModal })

  const eyeForPassword = showPassword ? EyeHide : Eye

  const typeOfInputPassword = showPassword ? 'text' : 'password'

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal((prev) => !prev)
  }

  return (
    <div className={classForModal}>
      <form className='confirm-you-password__modal'>
        <button className='confirm-you-password__modal-close' onClick={handleCloseModal}>
          <img src={CloseIcon} alt='close' />
        </button>
        <p className='confirm-you-password__modal-title'>Confirm password</p>
        <p className='confirm-you-password__modal-subtitle'>
          To update your email address you'll need to confirm your password
        </p>
        <div className='confirm-you-password__modal-pass'>
          <img src={eyeForPassword} alt='eye' onClick={() => setShowPassword((prev) => !prev)} />
          <label htmlFor='confirm-you-password'>Enter Password</label>
          <input type={typeOfInputPassword} id='confirm-you-password' />
        </div>
        <button onClick={handleSubmit} className='confirm-you-password__modal-sign' type='submit'>
          <img src={ArrowRight} alt='arrow' />
          Confirm password
        </button>
        <Link to='/forgot-password'>
          <div className='confirm-you-password__modal-forgot'>Forgot your password?</div>
        </Link>
      </form>
    </div>
  )
}
