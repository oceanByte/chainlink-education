import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Label, Input, InvalidBox } from './Input.style'
import classnames from 'classnames'

type InputViewProps = {
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

export const InputView = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type,
  inputStatus,
  isDisabled,
  errorMessage,
}: InputViewProps) => {
  return (
    <>
      <Label className={classnames(isDisabled && 'disabled')}>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        autoComplete={name}
        disabled={isDisabled}
        className={
          classnames(
            inputStatus,
            isDisabled && 'disabled',
          )
        }
      />
      
      {errorMessage ? (
        <InvalidBox>
          {errorMessage }
        </InvalidBox>
      ) : null}
    </>
  )
}

InputView.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  type: PropTypes.string,
  isInvalid: PropTypes.bool,
  isTouched: PropTypes.bool,
  isDisabled: PropTypes.bool,
  errorMessage: PropTypes.string,
}

InputView.defaultProps = {
  placeholder: undefined,
  name: undefined,
  value: undefined,
  type: 'text',
}
