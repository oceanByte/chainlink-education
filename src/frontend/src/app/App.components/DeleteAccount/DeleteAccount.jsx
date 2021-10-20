import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EyeHide from '../../../assets/eyeHide.png'
import Eye from '../../../assets/eye.png'
import ArrowRight from '../../../assets/arrowRight.png'
import CloseIcon from '../../../assets/closeicon.png'
import classnames from 'classnames'

export const DeleteAccount = ({ showModal, setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false)

  const classForModal = classnames('delete-account', { 'delete-account-hide': showModal })

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
      <form className="delete-account__modal">
        <button className="delete-account__modal-close" onClick={handleCloseModal}>
          <img src={CloseIcon} alt="close" />
        </button>
        <p className="delete-account__modal-title">Delete your account</p>
        <p className="delete-account__modal-subtitle">
          You will lose access to all projects that you own. Are you sure you want to continue?
        </p>
        <div className="delete-account__modal-pass">
          <img src={eyeForPassword} alt="eye" onClick={() => setShowPassword((prev) => !prev)} />
          <label htmlFor="delete-account">Enter Password</label>
          <input type={typeOfInputPassword} id="delete-account" />
        </div>
        <button onClick={handleSubmit} className="delete-account__modal-sign" type="submit">
          <img src={ArrowRight} alt="arrow" />
          Delete account
        </button>
      </form>
    </div>
  )
}
