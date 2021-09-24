import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { InputSpacer } from 'app/App.components/Input/Input.style'
//prettier-ignore
import { FormInputs, getErrorMessage, getInputStatus, updateFormFromBlur, updateFormFromChange, updateFormFromSubmit } from 'helpers/form'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { ForgotPasswordInputs } from 'shared/user/ForgotPassword'
import ArrowRight from '../../assets/arrowRight.png'
import { Link } from 'react-router-dom'

//prettier-ignore
import { ForgotPasswordCard, ForgotPasswordStyled, ForgotPasswordTitle } from './ForgotPassword.style'

type ForgotPasswordViewProps = {
  forgotPasswordCallback: (values: any) => void
  loading: boolean
}

export const ForgotPasswordView = ({ forgotPasswordCallback, loading }: ForgotPasswordViewProps) => {
  const [form, setForm] = useState<FormInputs>({
    usernameOrEmail: { value: '' },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromChange(e, form, ForgotPasswordInputs)
    setForm(updatedForm)
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromBlur(e, form)
    setForm(updatedForm)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    const updatedForm = updateFormFromSubmit(event, form, ForgotPasswordInputs)

    if (!updatedForm.usernameOrEmail.error)
      forgotPasswordCallback({
        usernameOrEmail: updatedForm.usernameOrEmail.value,
      })
    else setForm(updatedForm)
  }

  return (
    <>
      <form className="forgot-password" onSubmit={handleSubmit}>
        <div className="forgot-password-title">Forgot password?</div>
        <div className="forgot-password-subtitle">
          Enter your email address and you will receive an email the with password reset link
        </div>
        <div className="forgot-password-email">
          <label htmlFor="forgot-password-email">Email address</label>
          <input
            type="email"
            id="forgot-password-email"
            name="usernameOrEmail"
            onChange={handleChange}
            value={form.usernameOrEmail.value}
            onBlur={handleBlur}
            required
            // inputStatus={getInputStatus(form.usernameOrEmail)}
            // errorMessage={getErrorMessage(form.usernameOrEmail)}
          />
        </div>
        <button className="forgot-password-sign" type="submit">
          <img src={ArrowRight} alt="arrow" />
          Get a new password
        </button>
        <Link to="/login">
          <div className="forgot-password-forgot">Return to Sign In</div>
        </Link>

        <div className="forgot-password-bottom-sign">
          <div className="forgot-password-bottom-sign-text">Don't have an account yet?</div>
          <Link to="/">
            <button className="forgot-password-bottom-sign-button">Sign up</button>
          </Link>
        </div>
      </form>
      {/* <ForgotPasswordStyled>
        <ForgotPasswordTitle>
          <h1>Forgot Password</h1>
        </ForgotPasswordTitle>
        <ForgotPasswordCard>
          <form onSubmit={handleSubmit}>
            <Input
              icon="user"
              name="usernameOrEmail"
              placeholder="Username or Email"
              type="text"
              onChange={handleChange}
              value={form.usernameOrEmail.value}
              onBlur={handleBlur}
              inputStatus={getInputStatus(form.usernameOrEmail)}
              errorMessage={getErrorMessage(form.usernameOrEmail)}
            />
            <InputSpacer />
            <Button type="submit" text="Submit" icon="forgotPassword" loading={loading} />
          </form>
        </ForgotPasswordCard>
      </ForgotPasswordStyled> */}
    </>
  )
}

ForgotPasswordView.propTypes = {
  forgotPasswordCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

ForgotPasswordView.defaultProps = {
  loading: false,
}
