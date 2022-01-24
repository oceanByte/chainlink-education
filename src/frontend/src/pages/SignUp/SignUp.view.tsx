import classnames from 'classnames'
import { Formik } from 'formik';
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'
import * as Yup from 'yup';

import { InputField } from '../../app/App.components/Form/InputField/Input.controller';
import { InputFieldWithEye } from '../../app/App.components/Form/InputFieldWithEye/Input.controller';
import { HeaderAuth } from '../../app/App.components/HeaderAuth/HeaderAuth.controller'
import Confirm from '../../assets/confirm.png'
import Eye from '../../assets/eye.png'
import EyeHide from '../../assets/eyeHide.png'
import UnConfirm from '../../assets/unconfirm.png'
import { CheckboxWrapp, ErrorMessage, Row } from './SignUp.style';

export const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username must be longer than or equal to 2 characters')
    .max(50, 'Username must be shorter than or equal to 50 characters')
    .required('This field is required!'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required!'),
  password: Yup.string()
    .matches(/(?=.*\d)(?=.*[a-zäöüßа-яієїґ])(?=.*[A-ZÄÖÜА-ЯІЄЇГҐ])(?=.*[-+_!@#$%^&*.,?<>()|"])/, 'Invalid password')
    .min(8, 'Password must be longer than or equal to 8 characters')
    .max(50, 'Password must be shorter than or equal to 50 characters')
    .required('This field is required!'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Password mismatch'),
  agree: Yup.bool().oneOf(
    [true],
    "You can't continue without agreeing to terms of use"
  ),
});

type SignUpViewProps = {
  signUpCallback: (values: any) => void
  loading: boolean
}

interface IFormInputs {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  agree: boolean,
}

export const SignUpView = ({ signUpCallback, loading }: SignUpViewProps) => {

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  };
  const [password, setPassword] = useState('')

  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [special, setSpecial] = useState(false)
  const [minLength, setMinLength] = useState(false)

  const regUppercase = /^(?=.*[A-ZÄÖÜА-ЯІЄЇГҐ]).+$/gm
  const regLowercase = /^(?=.*[a-zäöüßа-яієїґ]).+$/gm
  const regNumbers = /^(?=.*\d).+$/gm
  const regSpecial = /[-+_!§@#$%^&*.,?<>()|"]/gm
  const regMinLength = /^.{8,}$/gm

  const uppercaseImage = uppercase ? Confirm : UnConfirm
  const lowercaseImage = lowercase ? Confirm : UnConfirm
  const numbersImage = numbers ? Confirm : UnConfirm
  const specialImage = special ? Confirm : UnConfirm
  const minLengthImage = minLength ? Confirm : UnConfirm

  const [checkedInput, setCheckedInput] = useState(false)
  const classNameInputChecked = classnames('sign-up__checkbox-label', { 'sign-up__checkbox-checked': checkedInput })

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

  const handleSubmit = (values: IFormInputs) => {
    signUpCallback(values)
  }

  return (
    <>
      <HeaderAuth isSignUp />
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
          <form className="sign-up" onSubmit={handleSubmit}>
            <div className="sign-up-title">Sign up</div>

            <Row>
              <InputField
                label="USERNAME"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                inputStatus={
                  errors.username && touched.username
                    ? 'error' : !errors.username && touched.username
                      ? 'success' : undefined
                }
                errorMessage={errors.username && touched.username && errors.username}
                isDisabled={false}
              />
            </Row>
            <Row>
              <InputField
                label="EMAIL ADDRESS"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                inputStatus={
                  errors.email && touched.email
                    ? 'error' : !errors.email && touched.email
                      ? 'success' : undefined
                }
                errorMessage={errors.email && touched.email && errors.email}
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
                    ? 'error' : !errors.password && touched.password
                      ? 'success' : undefined
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
                    ? 'error' : !errors.confirmPassword && touched.confirmPassword
                      ? 'success' : undefined
                }
                errorMessage={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                isDisabled={false}
              />
            </Row>
            <CheckboxWrapp>
              <div className="sign-up__checkbox" onClick={() => setCheckedInput((prev) => !prev)}>
                <label
                  htmlFor="sign-up__checkbox"
                  className={classNameInputChecked}
                  onChange={() => setCheckedInput((prev) => !prev)}
                >
                  <input
                    type="checkbox"
                    id="sign-up__checkbox"
                    className="sign-up__checkbox-input"
                    name="agree"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                <span className="sign-up__checkbox-text">
                  By signing up, you confirm that you've agreed to our <a href="/terms">Terms of Use</a>
                </span>
              </div>
              {!touched.agree && errors.agree ? (
                <ErrorMessage>
                  {errors.agree}
                </ErrorMessage>
              ) : null}
            </CheckboxWrapp>
            <button className="reset-password__sign" type="submit">
              Create your free account
            </button>
          </form>
        )}
      </Formik>
    </>
  )
}

SignUpView.propTypes = {
  signUpCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

SignUpView.defaultProps = {
  loading: false,
}
