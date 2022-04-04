//prettier-ignore
import { Link } from 'react-router-dom'

import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputFieldWithEye } from '../../app/App.components/Form/InputFieldWithEye/Input.controller';

import { Row } from './DeleteAccount.style'
import ArrowRight from '../../assets/arrowRight.png'

type DeleteAccountViewProps = {
  deleteAccountCallback: (values: any) => void
  loading: boolean
}

export const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required!'),
});

interface IFormInputs {
  password: string,
}

export const DeleteAccountView = ({ deleteAccountCallback }: DeleteAccountViewProps) => {

  const initialValues = {
    password: '',
  };

  const handleSubmit = (values: IFormInputs) => {
    deleteAccountCallback(values)
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
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="delete-account" onSubmit={handleSubmit}>
              <div className="delete-account-title">Delete your account</div>
              <div className="delete-account-subtitle">
                Enter your current password
              </div>
              
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

              <button className="delete-account-sign" type="submit">
                <img src={ArrowRight} alt="arrow" />
                Delete account
              </button>
              <Link to="/profile">
                <div className="delete-account-profile">Return to Profile</div>
              </Link>
            </form>
        )}
      </Formik>
    </>
  )
}

DeleteAccountView.propTypes = {
  deleteAccountCallback: PropTypes.func.isRequired,
}
