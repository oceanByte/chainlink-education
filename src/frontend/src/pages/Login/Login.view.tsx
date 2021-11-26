import * as React from 'react'
import { useState } from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Formik } from 'formik';
import * as Yup from 'yup';

import Eye from '../../assets/eye.png'
import EyeHide from '../../assets/eyeHide.png'
import ArrowRight from '../../assets/arrowRight.png'

const ValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(2, 'Username must be longer than or equal to 2 characters')
    .max(50, 'Username must be shorter than or equal to 50 characters')
    .required('This field is required!'),
  password: Yup.string()
    .min(8, 'Password must be longer than or equal to 8 characters')
    .max(50, 'Password must be shorter than or equal to 50 characters')
    .required('This field is required!'),
});

type LoginViewProps = {
  loginCallback: (values: any) => void
  loading: boolean
}

interface IFormInputs {
  usernameOrEmail: string,
  password: string,
}

export const LoginView = ({ loginCallback, loading }: LoginViewProps) => {

  const initialValues: IFormInputs = {
    usernameOrEmail: '',
    password: '',
  };

  const [showPassword, setShowPassword] = useState(false)

  const eyeForPassword = showPassword ? EyeHide : Eye

  const typeOfInputPassword = showPassword ? 'text' : 'password'

  const handleSubmit = (values: IFormInputs) => {
    loginCallback(values)
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
          <form className="login-form" onSubmit={handleSubmit}>
            <p className="login-form-title">Sign in</p>
            <div className="login-form-email">
              <label htmlFor="login-form-email">Email address</label>
              <input
                type="text"
                id="login-form-email"
                name="usernameOrEmail"
                onChange={handleChange}
                value={values.usernameOrEmail}
                onBlur={handleBlur}
                // inputStatus={getInputStatus(form.usernameOrEmail)}
                // errorMessage={getErrorMessage(form.usernameOrEmail)}
              />
            </div>
            <div className="login-form-password">
              <img src={eyeForPassword} alt="eye" onClick={() => setShowPassword((prev) => !prev)} />
              <label htmlFor="login-form-password">Password</label>
              <input
                type={typeOfInputPassword}
                id="login-form-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button className="login-form-sign" type="submit">
              <img src={ArrowRight} alt="arrow" />
              Sign In
            </button>
            <Link to="/forgot-password">
              <div className="login-form-forgot">Forgot your password?</div>
            </Link>
          </form>
        )}
      </Formik>
    </>
  )
}

LoginView.propTypes = {
  loginCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

LoginView.defaultProps = {
  loading: false,
}
