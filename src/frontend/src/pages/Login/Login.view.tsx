import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Formik } from 'formik';
import * as Yup from 'yup';

import ArrowRight from '../../assets/arrowRight.png'

import { InputField } from '../../app/App.components/Form/InputField/Input.controller';
import { InputFieldWithEye } from '../../app/App.components/Form/InputFieldWithEye/Input.controller';

import { Row } from './Login.style';

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
            <div className="login-form-title">Sign in</div>
            <Row>
              <InputField
                label="Email address or Username"
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
            <Row>
              <InputFieldWithEye
                label="Password"
                value={values.password}
                onChange={handleChange}
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
