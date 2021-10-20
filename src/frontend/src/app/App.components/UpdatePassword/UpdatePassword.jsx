import React, { useState } from 'react'
import classnames from 'classnames'
import Eye from '../../../assets/eye.png'
import EyeHide from '../../../assets/eyeHide.png'
import Confirm from '../../../assets/confirm.png'
import UnConfirm from '../../../assets/unconfirm.png'
import ArrowRight from '../../../assets/arrowRight.png'
import { Link } from 'react-router-dom'

export const UpdatePassword = ({ setShowModal }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [special, setSpecial] = useState(false)
  const [minLength, setMinLength] = useState(false)

  const regUppercase = /^(?=.*[A-ZÄÖÜА-ЯІЄЇГҐ]).+$/gm
  const regLowercase = /^(?=.*[a-zäöüßа-яієїґ]).+$/gm
  const regNumbers = /^(?=.*\d).+$/gm
  const regSpecial = /^(?=.*[@&%*!?]).+$/gm
  const regMinLength = /^.{8,}$/gm

  const uppercaseImage = uppercase ? Confirm : UnConfirm
  const lowercaseImage = lowercase ? Confirm : UnConfirm
  const numbersImage = numbers ? Confirm : UnConfirm
  const specialImage = special ? Confirm : UnConfirm
  const minLengthImage = minLength ? Confirm : UnConfirm

  const eyeForCurrentPassword = showCurrentPassword ? EyeHide : Eye
  const eyeForPassword = showPassword ? EyeHide : Eye
  const eyeForConfirmPassword = showConfirmPassword ? EyeHide : Eye

  const typeOfInputCurrentPassword = showCurrentPassword ? 'text' : 'password'
  const typeOfInputPassword = showPassword ? 'text' : 'password'
  const typeOfInputConfirmPassword = showConfirmPassword ? 'text' : 'password'

  const handleChangePassword = (e) => {
    const {
      target: { value },
    } = e

    setUppercase(regUppercase.test(value))
    setLowercase(regLowercase.test(value))
    setNumbers(regNumbers.test(value))
    setSpecial(regSpecial.test(value))
    setMinLength(regMinLength.test(value))

    setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="update-password">
      <div className="update-password-title">Reset password</div>
      <div className="update-password__confirm-pass">
        <img src={eyeForCurrentPassword} alt="eye" onClick={() => setShowCurrentPassword((prev) => !prev)} />
        <label htmlFor="update-password__confirm-pass">Current Password</label>
        <input
          type={typeOfInputCurrentPassword}
          id="update-password__confirm-pass"
          onChange={(e) => setCurrentPassword(e.target.value)}
          value={currentPassword}
        />
      </div>
      <div className="update-password__pass">
        <img src={eyeForPassword} alt="eye" onClick={() => setShowPassword((prev) => !prev)} />
        <label htmlFor="update-password-pass">Password</label>
        <input
          type={typeOfInputPassword}
          id="update-password-pass"
          name="solution"
          onChange={handleChangePassword}
          value={password}
        />
      </div>
      <div className="update-password__validation">
        <div className="update-password__validation-left">
          <div className="update-password__validation-left-uppercase-letter">
            <img src={uppercaseImage} alt="confirm" />
            Min 1 uppercase letter
          </div>
          <div className="update-password__validation-left-lowercase-letter">
            <img src={lowercaseImage} alt="confirm" />
            Min 1 lowercase letter
          </div>
          <div className="update-password__validation-left-number">
            <img src={numbersImage} alt="confirm" />
            Min 1 numbers
          </div>
        </div>
        <div className="update-password__validation-right">
          <div className="update-password__validation-right-special-characters" title="@, &, %, *, !, ?">
            <img src={specialImage} alt="confirm" />
            Min 1 special characters
          </div>
          <div className="update-password__validation-right-min-length">
            <img src={minLengthImage} alt="confirm" />
            Min length = 8
          </div>
        </div>
      </div>
      <div className="update-password__confirm-pass">
        <img src={eyeForConfirmPassword} alt="eye" onClick={() => setShowConfirmPassword((prev) => !prev)} />
        <label htmlFor="update-password__confirm-pass">Confirm Password</label>
        <input
          type={typeOfInputConfirmPassword}
          id="update-password__confirm-pass"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        />
      </div>
      <button onClick={() => setShowModal(false)} className="btn btn-green update-password-btn" type="submit">
        <span> Update password </span>
        <span className='arrow-upright' />
      </button>
    </form>
  )
}
