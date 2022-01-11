import * as PropTypes from 'prop-types'
import * as React from 'react'

import { InputView } from './Input.view'

type InputProps = {
  label: string
  name: string
  value?: string
  onChange: any
  onBlur: any
  type: string
  inputStatus?: 'success' | 'error'
  isDisabled?: boolean | undefined
  errorMessage?: string | false | undefined
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type,
  inputStatus,
  isDisabled,
  errorMessage
}: InputProps) => {
  return (
    <InputView
      label={label}
      type={type}
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

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  type: PropTypes.string,
  inputStatus: PropTypes.string,
  isDisabled: PropTypes.bool,
}

InputField.defaultProps = {
  label: undefined,
  name: undefined,
  value: undefined,
  inputStatus: '',
  type: 'text',
}
