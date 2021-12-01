import * as PropTypes from 'prop-types'
import * as React from 'react'

import { InputViewWithEye } from './Input.view'

type InputFieldWithEyeProps = {
  label: string
  name: string
  value?: string
  onChange: any
  onBlur: any
  inputStatus?: 'success' | 'error'
  isDisabled?: boolean | undefined
  errorMessage?: string | false | undefined
}

export const InputFieldWithEye = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  inputStatus,
  isDisabled,
  errorMessage,
}: InputFieldWithEyeProps) => {
  return (
    <InputViewWithEye
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputStatus={inputStatus}
      isDisabled={isDisabled}
      errorMessage={errorMessage}
    />
  )
}

InputFieldWithEye.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputStatus: PropTypes.string,
  isDisabled: PropTypes.bool,
}

InputFieldWithEye.defaultProps = {
  label: undefined,
  name: undefined,
  value: undefined,
  inputStatus: '',
}
