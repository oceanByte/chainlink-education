import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { InputSpacer } from 'app/App.components/Input/Input.style'
//prettier-ignore
import { Link } from 'react-router-dom'

import {
  FormInputs,
  updateFormFromBlur,
  updateFormFromSubmit,
} from 'helpers/form'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { ResetPasswordInputs } from 'shared/user/ResetPassword'

import { ResetPasswordCard, ResetPasswordStyled, ResetPasswordTitle } from './ResetPassword.style'
import Eye from '../../assets/eye.png'
import EyeHide from '../../assets/eyeHide.png'
import Confirm from '../../assets/confirm.png'
import UnConfirm from '../../assets/unconfirm.png'
import ArrowRight from '../../assets/arrowRight.png'

type ResetPasswordViewProps = {
  resetPasswordCallback: (values: any) => void
  loading: boolean
}

export const ResetPasswordView = ({ resetPasswordCallback, loading }: ResetPasswordViewProps) => {
  const [form, setForm] = useState<FormInputs>({
    solution: { value: '' },
    newPassword: { value: '' },
  })
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showErrorMachPassword, setShowErrorMachPassword] = useState(2)

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

  const eyeForPassword = showPassword ? EyeHide : Eye
  const eyeForConfirmPassword = showConfirmPassword ? EyeHide : Eye

  const typeOfInputPassword = showPassword ? 'text' : 'password'
  const typeOfInputConfirmPassword = showConfirmPassword ? 'text' : 'password'

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { value },
  //   } = e

  //   setUppercase(regUppercase.test(value))
  //   setLowercase(regLowercase.test(value))
  //   setNumbers(regNumbers.test(value))
  //   setSpecial(regSpecial.test(value))
  //   setMinLength(regMinLength.test(value))

  //   const updatedForm = updateFormFromChange(e, form, ResetPasswordInputs)

  //   setForm(updatedForm)
  // }

  const handleChangePassword = (e: any) => {
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

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromBlur(e, form)

    setForm(updatedForm)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    const updatedForm = updateFormFromSubmit(event, form, ResetPasswordInputs)

    if (!updatedForm.newPassword.error && !updatedForm.solution.error)
      resetPasswordCallback({
        newPassword: updatedForm.newPassword.value,
        solution: updatedForm.solution.value,
      })
    else setForm(updatedForm)
  }

  const passwordMatching = () => {
    const errorDiv = document.querySelector('.reset-password__error')
    console.log(errorDiv)

    if (form.solution.value === confirmPass) {
      // setShowErrorMachPassword(33)
      // errorDiv.style.display = 'none'
    } else {
      setShowErrorMachPassword(77)
    }
    setTimeout(() => console.log(showErrorMachPassword), 2000)

    // console.dir(errorDiv)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="reset-password">
        <div className="reset-password-title">Reset your password</div>
        <div className="reset-password-subtitle">
          Pick and set a new password for your account, and you’re good to go!
        </div>
        <div className="reset-password__pass">
          <img src={eyeForPassword} alt="eye" onClick={() => setShowPassword((prev) => !prev)} />
          <label htmlFor="reset-password-pass">Choose new password</label>
          <input
            type={typeOfInputPassword}
            id="reset-password-pass"
            name="solution"
            onChange={handleChangePassword}
            value={password}
            onBlur={handleBlur}
          />
        </div>
        <div className="reset-password__validation">
          <div className="reset-password__validation-left">
            <div className="reset-password__validation-left-uppercase-letter">
              <img src={uppercaseImage} alt="confirm" />
              Min 1 uppercase letter
            </div>
            <div className="reset-password__validation-left-lowercase-letter">
              <img src={lowercaseImage} alt="confirm" />
              Min 1 lowercase letter
            </div>
            <div className="reset-password__validation-left-number">
              <img src={numbersImage} alt="confirm" />
              Min 1 numbers
            </div>
          </div>
          <div className="reset-password__validation-right">
            <div className="reset-password__validation-right-special-characters" title="@, &, %, *, !, ?">
              <img src={specialImage} alt="confirm" />
              Min 1 special characters
            </div>
            <div className="reset-password__validation-right-min-length">
              <img src={minLengthImage} alt="confirm" />
              Min length = 8
            </div>
          </div>
        </div>
        <div className="reset-password__confirm-pass">
          <img src={eyeForConfirmPassword} alt="eye" onClick={() => setShowConfirmPassword((prev) => !prev)} />
          <label htmlFor="reset-password__confirm-pass">Confirm Password</label>
          <input
            type={typeOfInputConfirmPassword}
            id="reset-password__confirm-pass"
            // onChange={handleChange}
            // value={form.newPassword.value}
            onChange={(e) => setConfirmPass(e.target.value)}
            onBlur={passwordMatching}
            value={confirmPass}
          />
        </div>
        <button className="reset-password__sign" type="submit">
          <img src={ArrowRight} alt="arrow" />
          Sign In
        </button>
        <Link to="/login">
          <div className="reset-password__forgot">Return to Sign In</div>
        </Link>
      </form>
      {/* <ResetPasswordStyled>
        <ResetPasswordTitle>
          <h1>Reset Password</h1>
        </ResetPasswordTitle>
        <ResetPasswordCard>
          <form onSubmit={handleSubmit}>
            <Input
              icon="check-shield"
              name="solution"
              placeholder="Captcha from email"
              type="text"
              onChange={handleChange}
              value={form.solution.value}
              onBlur={handleBlur}
              inputStatus={getInputStatus(form.solution)}
              errorMessage={getErrorMessage(form.solution)}
            />
            <Input
              icon="password"
              name="newPassword"
              placeholder="New password"
              type="password"
              onChange={handleChange}
              value={form.newPassword.value}
              onBlur={handleBlur}
              inputStatus={getInputStatus(form.newPassword)}
              errorMessage={getErrorMessage(form.newPassword)}
            />
            <InputSpacer />
            <Button type="submit" text="Submit" icon="login" loading={loading} />
          </form>
        </ResetPasswordCard>
      </ResetPasswordStyled> */}
    </>
  )
}

ResetPasswordView.propTypes = {
  resetPasswordCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

ResetPasswordView.defaultProps = {
  loading: false,
}
