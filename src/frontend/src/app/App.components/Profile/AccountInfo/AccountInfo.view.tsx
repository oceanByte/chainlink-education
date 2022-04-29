import React, { useEffect, useState } from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { PublicUser } from 'shared/user/PublicUser'
import { InputField } from 'app/App.components/Form/InputField/Input.controller';
import { DeleteAccountModal } from 'modals/DeleteAccount/DeleteAccount.view';
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view';
import { IChangeUsernameEmail } from 'pages/Profile/Profile.controller';

interface ICertificatesView {
  user?: PublicUser
  changeEmailOrUsernameCallback: ({email, username}: IChangeUsernameEmail)=> void,
  deleteAccountCallback: ()=> void
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('This field is required!'),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers and underscores')
    .min(2, 'Username must be longer than or equal to 2 characters')
    .max(50, 'Username must be shorter than or equal to 50 characters')
    .required('This field is required!'),
});

export const AccountInfo = ({ user, changeEmailOrUsernameCallback, deleteAccountCallback }: ICertificatesView) => {
  const [isDeleteAccVisible, setIsDeleteAccVisible] = useState(false)
  const initialValue = {
    email: user? user?.email : '',
    username: user? user?.username : ''
  }

  const showDeleteAccountModal = () => {
    deleteAccountCallback()
  }

  const hideDeleteAccountModal = () => {
    setIsDeleteAccVisible(() => false)
  }

  const handleSubmit = (values: { email: string, username: string }) => {
    let newValues = {};

    if (values.email !== user?.email) {
      newValues = {
        email: values.email
      }
    }
    if (values.username !== user?.username) {
      newValues = {
        ...newValues,
        username: values.username
      }
    }

    changeEmailOrUsernameCallback(newValues);
  }

  useEffect(() => {
    if (user && user.deleteAccountPending) {
      setIsDeleteAccVisible(() => true)
    }
  }, [user])

  return (
    <>
      <div className='profile-page-account-info-wrapper'>
        <div className='profile-page-section__header h-font'>Account info</div>
          <Formik
            enableReinitialize
            initialValues={initialValue}
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
                isValid
              }) => (
                <form className="profile-page-account-info__form" onSubmit={handleSubmit}>
                  <div className='profile-page-account-info__username p-font'>
                    <InputField
                      label="USERNAME"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      inputStatus={
                        errors.username && touched.username
                          ? 'error' : undefined
                        }
                      errorMessage={errors.username && touched.username && errors.username}
                      isDisabled={false}
                    />
                  </div>
                  <div className='profile-page-account-info__email p-font'>
                    <InputField
                      label="EMAIL ADDRESS"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      inputStatus={
                        errors.email && touched.email
                          ? 'error' : undefined
                        }
                      errorMessage={errors.email && touched.email && errors.email}
                      isDisabled={false}
                    />
                  </div>
                  <div className='btn-wrapper'>
                    <MainButtonView
                      isPrimary
                      type='submit'
                      hasArrowUpRight
                      text='Save changes'
                      loading={false}
                      disabled={!isValid || (values.email === user?.email && values.username === user.username)}
                    />
                  </div>
                </form>
            )}
          </Formik>
        </div>
        {user && user.changeEmailPending ? (
          <div className='profile-page-account-info__message'>
            You have received an email. Please open the link to confirm your email update.
          </div>
        ) : null}
          
      <div onClick={showDeleteAccountModal} className='profile-page-account-info__delete-account'>
        Delete your account
      </div>
    <DeleteAccountModal
      open={isDeleteAccVisible}
      onClose={hideDeleteAccountModal}
    />
    </>
  )
}