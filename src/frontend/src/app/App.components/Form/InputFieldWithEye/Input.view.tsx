import * as React from 'react'
import * as PropTypes from 'prop-types'
import { useState } from 'react'

import { Label, Input, InvalidBox, InputWrapp } from './Input.style'
import classnames from 'classnames'

import Eye from '../../../../assets/eye.png'
import EyeHide from '../../../../assets/eyeHide.png'

type InputViewWithEyeProps = {
  label: string
  name: string
  value?: string
  onChange: any
  onBlur: any
  inputStatus?: 'success' | 'error'
  isDisabled?: boolean | undefined
  errorMessage?: string | false | undefined
  isName?: boolean | undefined
}

export const InputViewWithEye = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  inputStatus,
  isDisabled,
  errorMessage,
}: InputViewWithEyeProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const eyeForPassword = showPassword ? EyeHide : Eye

  const typeOfInputPassword = showPassword ? 'text' : 'password'
  return (
    <>
      <Label className={classnames(isDisabled && 'disabled')}>{label}</Label>
      <InputWrapp className={
        classnames(
          inputStatus,
          isDisabled && 'disabled',
        )
      }>
        <Input
          type={typeOfInputPassword}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          autoComplete={name}
          disabled={isDisabled}
        />
        <div
          className={'eyeContainer'}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <img src={eyeForPassword} alt="eye"/>
        </div>
      </InputWrapp>

      {errorMessage ? (
        <InvalidBox>
          {errorMessage }
        </InvalidBox>
      ) : null}
    </>
  )
}

InputViewWithEye.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  isTouched: PropTypes.bool,
  isDisabled: PropTypes.bool,
  errorMessage: PropTypes.string,
}

InputViewWithEye.defaultProps = {
  placeholder: undefined,
  name: undefined,
  value: undefined,
}
