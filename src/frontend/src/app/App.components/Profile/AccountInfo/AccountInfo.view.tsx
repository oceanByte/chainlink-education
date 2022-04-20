import React, { useEffect, useState } from 'react'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { PublicUser } from 'shared/user/PublicUser'
import { InputField } from 'app/App.components/Form/InputField/Input.controller';
import { DeleteAccountModal } from 'modals/DeleteAccount/DeleteAccount.view';

interface ICertificatesView {
  user?: PublicUser
  changeEmailCallback: ({email}: {email: string})=> void,
  deleteAccountCallback: ()=> void
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required!'),
});

export const AccountInfo = ({ user, changeEmailCallback, deleteAccountCallback }: ICertificatesView) => {
  const [isDeleteAccVisible, setIsDeleteAccVisible] = useState(false)
  const initialValue = {
    email: user? user?.email : ''
  }

  const showDeleteAccountModal = () => {
    deleteAccountCallback()
  }

  const hideDeleteAccountModal = () => {
    setIsDeleteAccVisible(() => false)
  }

  const handleSubmit = (values: { email: string }) => {
    changeEmailCallback(values);
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
          <div className='profile-page-account-info__username p-font'>
            <label htmlFor='profile-page-account-info__username__input'>Username</label>
            <div>{user?.username}</div>
            {/* <input
              type='text'
              id='profile-page-account-info__username__input'
              name='solution'
            /> */}
          </div>
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
              }) => (
                <form className="profile-page-account-info__form" onSubmit={handleSubmit}>
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
                          ? 'error' : !errors.email && touched.email 
                          ? 'success' : undefined
                        }
                      errorMessage={errors.email && touched.email && errors.email}
                      isDisabled={false}
                    />
                  </div>
                  <button className='btn btn-green' type='submit'>
                    <span className='profile-page-account-info__button__text'> Save changes </span>
                    <span className='arrow-upright' />
                  </button>
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