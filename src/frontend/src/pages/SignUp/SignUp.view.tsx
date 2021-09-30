import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { InputSpacer } from 'app/App.components/Input/Input.style'
import classnames from 'classnames'
//prettier-ignore
import { FormInputs, getErrorMessage, getInputStatus, updateFormFromBlur, updateFormFromChange, updateFormFromSubmit } from 'helpers/form'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SignUpInputs } from 'shared/user/SignUp'
import Wave from '../../assets/wave.png'

import { SignUpCard, SignUpLogin, SignUpStyled, SignUpTitle } from './SignUp.style'

import { HeaderAuth } from '../../app/App.components/HeaderAuth/HeaderAuth.controller'

import Eye from '../../assets/eye.png'
import EyeHide from '../../assets/eyeHide.png'
import Confirm from '../../assets/confirm.png'
import UnConfirm from '../../assets/unconfirm.png'
import ArrowRight from '../../assets/arrowRight.png'

type SignUpViewProps = {
  signUpCallback: (values: any) => void
  loading: boolean
}

export const SignUpView = ({ signUpCallback, loading }: SignUpViewProps) => {
  const [form, setForm] = useState<FormInputs>({
    username: { value: '' },
    email: { value: '' },
    password: { value: '' },
    confirmPassword: { value: '' },
    referral: { value: '' },
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

  const [checkedInput, setCheckedInput] = useState(false)
  const classNameInputChecked = classnames('sign-up__checkbox-label', { 'sign-up__checkbox-checked': checkedInput })

  console.log('CHECKED', checkedInput)
  const setReferalLink = (url: string) => {
    setForm((prev) => ({ ...prev, referral: { value: url } }))
  }

  useEffect(() => {
    const url = window.location.href

    if (url.includes('?referral=')) {
      setReferalLink(url)
    }
  }, [])

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromChange(e, form, SignUpInputs)
    setForm(updatedForm)
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromBlur(e, form)
    setForm(updatedForm)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    const updatedForm = updateFormFromSubmit(event, form, SignUpInputs)

    if (
      !updatedForm.username.error &&
      !updatedForm.email.error &&
      !updatedForm.password.error &&
      !updatedForm.confirmPassword.error
    )
      signUpCallback({
        username: updatedForm.username.value,
        email: updatedForm.email.value,
        password: updatedForm.password.value,
        confirmPassword: updatedForm.confirmPassword.value,
        referral: updatedForm.referral.value,
      })
    else setForm(updatedForm)
  }

  return (
    <>
      <HeaderAuth />
      <form className="sign-up">
        <p className="sign-up-title">Sign in</p>
        <button className="sign-up-google">
          Continue with <span>Google</span>
        </button>
        <button className="sign-up-facebook">
          Continue with <span>Facebook</span>
        </button>
        <div className="sign-up-wave">
          <div className="sign-up-wave-or">or</div>
          <img src={Wave} alt="wave" />
        </div>
        <div className="sign-up-name">
          <label htmlFor="sign-up-user">USERNAME</label>
          <input type="text" id="sign-up-user" name="usernameOrEmail" />
        </div>
        <div className="sign-up-email">
          <label htmlFor="sign-up-email">EMAIL ADDRESS</label>
          <input type="text" id="sign-up-email" name="usernameOrEmail" />
        </div>
        <div className="sign-up__pass">
          <img src={eyeForPassword} alt="eye" onClick={() => setShowPassword((prev) => !prev)} />
          <label htmlFor="sign-up-pass">Choose new password</label>
          <input
            type={typeOfInputPassword}
            id="sign-up-pass"
            name="solution"
            onChange={handleChangePassword}
            value={password}
            onBlur={handleBlur}
          />
        </div>
        <div className="sign-up__validation">
          <div className="sign-up__validation-left">
            <div className="sign-up__validation-left-uppercase-letter">
              <img src={uppercaseImage} alt="confirm" />
              Min 1 uppercase letter
            </div>
            <div className="sign-up__validation-left-lowercase-letter">
              <img src={lowercaseImage} alt="confirm" />
              Min 1 lowercase letter
            </div>
            <div className="sign-up__validation-left-number">
              <img src={numbersImage} alt="confirm" />
              Min 1 numbers
            </div>
          </div>
          <div className="sign-up__validation-right">
            <div className="sign-up__validation-right-special-characters" title="@, &, %, *, !, ?">
              <img src={specialImage} alt="confirm" />
              Min 1 special characters
            </div>
            <div className="sign-up__validation-right-min-length">
              <img src={minLengthImage} alt="confirm" />
              Min length = 8
            </div>
          </div>
        </div>
        <div className="sign-up__confirm-pass">
          <img src={eyeForConfirmPassword} alt="eye" onClick={() => setShowConfirmPassword((prev) => !prev)} />
          <label htmlFor="sign-up__confirm-pass">Confirm Password</label>
          <input
            type={typeOfInputConfirmPassword}
            id="sign-up__confirm-pass"
            // onChange={handleChange}
            // value={form.newPassword.value}
            // onBlur={passwordMatching}
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
        </div>
        <div className="sign-up__checkbox" onClick={() => setCheckedInput((prev) => !prev)}>
          <label
            htmlFor="sign-up__checkbox"
            className={classNameInputChecked}
            onChange={() => setCheckedInput((prev) => !prev)}
          >
            <input type="checkbox" id="sign-up__checkbox" className="sign-up__checkbox-input" />
          </label>
          <span className="sign-up__checkbox-text">
            By signing up, you confirm that you've read and accepted our Privacy Policy and you've read Terms of Use
          </span>
        </div>
        <button className="reset-password__sign" type="submit">
          <img src={ArrowRight} alt="arrow" />
          Create your free account
        </button>
        <Link to="forgot-password">
          <div className="reset-password__forgot">Forgot your password?</div>
        </Link>
      </form>
    </>
    // <SignUpStyled>
    //   <SignUpTitle>
    //     <h1>Sign Up</h1>
    //   </SignUpTitle>
    //   <SignUpCard>
    //     <form onSubmit={handleSubmit}>
    //       <Input
    //         icon="user"
    //         name="username"
    //         placeholder="Username"
    //         type="text"
    //         onChange={handleChange}
    //         value={form.username.value}
    //         onBlur={handleBlur}
    //         inputStatus={getInputStatus(form.username)}
    //         errorMessage={getErrorMessage(form.username)}
    //       />
    //       <Input
    //         icon="email"
    //         name="email"
    //         placeholder="Email"
    //         type="text"
    //         onChange={handleChange}
    //         value={form.email.value}
    //         onBlur={handleBlur}
    //         inputStatus={getInputStatus(form.email)}
    //         errorMessage={getErrorMessage(form.email)}
    //       />
    //       <Input
    //         icon="password"
    //         name="password"
    //         placeholder="Password"
    //         type="password"
    //         onChange={handleChange}
    //         value={form.password.value}
    //         onBlur={handleBlur}
    //         inputStatus={getInputStatus(form.password)}
    //         errorMessage={getErrorMessage(form.password)}
    //       />
    //       <Input
    //         icon="password"
    //         name="confirmPassword"
    //         placeholder="Confirm password"
    //         type="password"
    //         onChange={handleChange}
    //         value={form.confirmPassword.value}
    //         onBlur={handleBlur}
    //         inputStatus={getInputStatus(form.confirmPassword)}
    //         errorMessage={getErrorMessage(form.confirmPassword)}
    //       />
    //       <Input
    //         icon="user"
    //         name="referral"
    //         placeholder="Referral"
    //         type="text"
    //         onChange={handleChange}
    //         value={form.referral.value}
    //         onBlur={handleBlur}
    //         inputStatus={getInputStatus(form.referral)}
    //         errorMessage={getErrorMessage(form.referral)}
    //       />
    //       <InputSpacer />
    //       <Button type="submit" text="Sign Up" icon="sign-up" loading={loading} />
    //     </form>
    //   </SignUpCard>
    //   <SignUpLogin>
    //     <Link to="/login">Or login now!</Link>
    //   </SignUpLogin>
    // </SignUpStyled>
  )
}

SignUpView.propTypes = {
  signUpCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

SignUpView.defaultProps = {
  loading: false,
}
