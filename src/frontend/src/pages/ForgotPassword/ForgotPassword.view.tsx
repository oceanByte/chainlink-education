import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { Formik } from 'formik';
import * as Yup from 'yup';

import ArrowRight from '../../assets/arrowRight.png'

//prettier-ignore
import { Row } from './ForgotPassword.style'
import { InputField } from '../../app/App.components/Form/InputField/Input.controller';

export const ValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(2, 'Email must be longer than or equal to 2 characters')
    .max(50, 'Email must be shorter than or equal to 50 characters')
    .required('This field is required!'),
});

interface IFormInputs {
  usernameOrEmail: string,
}

type ForgotPasswordViewProps = {
  forgotPasswordCallback: (values: any) => void
  loading: boolean
}

export const ForgotPasswordView = ({ forgotPasswordCallback, loading }: ForgotPasswordViewProps) => {

  const initialValues = {
    usernameOrEmail: '',
  };


  const handleSubmit = (values: IFormInputs) => {
    forgotPasswordCallback(values)
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
            <form className="forgot-password" onSubmit={handleSubmit}>
              <div className="forgot-password-title">Forgot password?</div>
              <div className="forgot-password-subtitle">
                Enter your email address and you will receive an email the with password reset link
              </div>
              <Row>
                <InputField
                  label="EMAIL ADDRESS"
                  type="text"
                  value={values.usernameOrEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="usernameOrEmail"
                  inputStatus={
                    errors.usernameOrEmail && touched.usernameOrEmail
                      ? 'error' : !errors.usernameOrEmail && touched.usernameOrEmail 
                      ? 'success' : undefined
                    }
                  errorMessage={errors.usernameOrEmail && touched.usernameOrEmail && errors.usernameOrEmail}
                  isDisabled={false}
                />
              </Row>
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
          )}
        </Formik>
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
