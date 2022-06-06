//prettier-ignore
import { Link } from 'react-router-dom'

import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from '../../app/App.components/Form/InputField/Input.controller';
import { InputFieldWithEye } from '../../app/App.components/Form/InputFieldWithEye/Input.controller';

import { Row } from './ResetPassword.style'
import Confirm from '../../assets/confirm.png'
import UnConfirm from '../../assets/unconfirm.png'
import ArrowRight from '../../assets/arrowRight.png'

type ResetPasswordViewProps = {
  resetPasswordCallback: (values: any) => void
  loading: boolean
}

export const ValidationSchema = Yup.object().shape({
  solution: Yup.string()
    .matches(/^\d+$/, 'Only positive number!')
    .required('This field is required!'),
  password: Yup.string()
    .matches(/(?=.*\d)(?=.*[a-zäöüßа-яієїґ])(?=.*[A-ZÄÖÜА-ЯІЄЇГҐ])(?=.*[-+_!@#$%^&*.,?<>()|"])/, 'Invalid password')
    .min(8, 'Password must be longer than or equal to 8 characters')
    .max(50, 'Password must be shorter than or equal to 50 characters')
    .required('This field is required!'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Password mismatch'),
});

interface IFormInputs {
  solution: string,
  password: string,
  confirmPassword: string,
}

export const ResetPasswordView = ({ resetPasswordCallback, loading }: ResetPasswordViewProps) => {

  const initialValues = {
    solution: '',
    password: '',
    confirmPassword: '',
  };

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

  const handleChangePassword = (e: any) => {
    const {
      target: { value },
    } = e

    setUppercase(regUppercase.test(value))
    setLowercase(regLowercase.test(value))
    setNumbers(regNumbers.test(value))
    setSpecial(regSpecial.test(value))
    setMinLength(regMinLength.test(value))

  }

  const handleSubmit = (values: IFormInputs) => {
    resetPasswordCallback({
      solution: values.solution,
      newPassword: values.password
    })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="reset-password" onSubmit={handleSubmit}>
              <div className="reset-password-title">Reset your password</div>
              <div className="reset-password-subtitle">
                Pick and set a new password for your account, and you’re good to go!
              </div>
              
              <Row>
                <InputField
                  label="SOLUTION"
                  type="text"
                  value={values.solution}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="solution"
                  inputStatus={
                    errors.solution && touched.solution
                      ? 'error' : undefined
                    }
                  errorMessage={errors.solution && touched.solution && errors.solution}
                  isDisabled={false}
                />
              </Row>
              <Row>
                <InputFieldWithEye
                  label="Choose new password"
                  value={values.password}
                  onChange={(e) => {
                    handleChangePassword(e)

                    setFieldValue("password", e.target.value)
                  }}
                  onBlur={handleBlur}
                  name="password"
                  inputStatus={
                    errors.password && touched.password
                      ? 'error' : undefined
                    }
                  errorMessage={errors.password && touched.password && errors.password}
                  isDisabled={false}
                />
              </Row>
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
                  <div className="sign-up__validation-right-special-characters" title='Only "!"'>
                    <img src={specialImage} alt="confirm" />
                    Min 1 special characters
                  </div>
                  <div className="sign-up__validation-right-min-length">
                    <img src={minLengthImage} alt="confirm" />
                    Min length = 8
                  </div>
                </div>
              </div>
              <Row>
                <InputFieldWithEye
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  inputStatus={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'error' : undefined
                    }
                  errorMessage={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  isDisabled={false}
                />
              </Row>

              <button className="reset-password__sign" type="submit">
                <img src={ArrowRight} alt="arrow" />
                Sign In
              </button>
              <Link to="/login">
                <div className="reset-password__forgot">Return to Sign In</div>
              </Link>
            </form>
        )}
      </Formik>
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
