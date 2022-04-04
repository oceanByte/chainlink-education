import * as React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Option } from 'app/App.components/Select/Select.view'
import { PublicUser } from 'shared/user/PublicUser'

import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
// import contract from '../../helpers/contracts.abi.json'
// import { ethers } from 'ethers'

import { ConfirmYouPassword } from '../../app/App.components/ConfirmYouPassword/ConfirmYouPassword'
import { UpdatePassword } from '../../app/App.components/UpdatePassword/UpdatePassword'
import { CoursesListView } from 'app/App.components/CoursesList/CourseList.view'
import { DeleteAccountModal } from 'modals/DeleteAccount/DeleteAccount.view'
import { InputField } from 'app/App.components/Form/InputField/Input.controller';

type ProfileViewProps = {
  user?: PublicUser,
  activeCourse: Option,
  changeEmailCallback: ({email}: {email: string})=> void,
  deleteAccountCallback: ()=> void
}

export const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required!'),
});

export const ProfileView = ({
  user,
  activeCourse,
  changeEmailCallback,
  deleteAccountCallback,
}: ProfileViewProps) => {
  
  const { search } = useLocation()
  const [section, setSection] = useState(1)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(true)
  const [isDeleteAccVisible, setIsDeleteAccVisible] = useState(false)
  const initialValue = {
    email: user? user?.email : ''
  }

  useEffect(() => {
    if (search) {
      setSection(() => +search[search.length-1])
    }
  }, [search])


  useEffect(() => {
    if (user && user.deleteAccountPending) {
      setIsDeleteAccVisible(() => true)
    }
  }, [user])

  const showDeleteAccountModal = () => {
    deleteAccountCallback()
  }

  const hideDeleteAccountModal = () => {
    setIsDeleteAccVisible(() => false)
  }

  const handleSubmit = (values: { email: string }) => {
    changeEmailCallback(values);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://www.chainlink.education/certificate/${user?.username}`);
    dispatch(showToaster(SUCCESS, 'Certificate link copied', 'You can share this link now.'));
  }

  // const connectToMetamask = async () => {
  //   const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner()

  //   return signer;
  // }

  // const issueCertificate = async () => {
  //   try {
  //     const signer = await connectToMetamask();
  //     const certificateContract = new ethers.Contract(contract.address, contract.abi, signer)
  //     console.log(await signer.getAddress(), user?.username)
  //     const nft = await certificateContract.mintNFT(await signer.getAddress(), user?.username)
  //     dispatch(showToaster(SUCCESS, 'NFT Certificate issued', 'Enjoy your new NFT!'));
  //     console.log(nft)
  //   } catch (e) {
  //     dispatch(showToaster(ERROR, 'NFT Certificate', 'Failed to issue a new NFT certificate.'));
  //     console.error(e)
  //   }
  // }

  return (
    <div className='profile-page'>
      <div className='profile-page-sections'>
        <div className='profile-page-sections-content'>
          <div onClick={() => setSection(1)}
               className={`profile-page-sections-content__item profile-item-progress ${section === 1 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Progress & Certificate</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(2)}
               className={`profile-page-sections-content__item profile-item-info ${section === 2 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </div>
          <div className='profile-page-sections-content__line' />
          <div onClick={() => setSection(3)}
               className={`profile-page-sections-content__item profile-item-reset ${section === 3 ? 'profile-item-selected' : ''}`}>
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </div>
        </div>
      </div>
      <div className={`profile-page-progress profile-page-section ${section === 1 ? 'profile-page-visible' : ''}`}>
        <CoursesListView user={user} />
      </div>
      <div className={`profile-page-account-info profile-page-section ${section === 2 ? 'profile-page-visible' : ''}`}>
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
                <form className="" onSubmit={handleSubmit}>
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
      </div>
      <div
        className={`profile-page-reset-password profile-page-section ${section === 3 ? 'profile-page-visible' : ''}`}>
        <UpdatePassword setShowModal={setIsConfirmPassVisible} />
      </div>
      <ConfirmYouPassword showModal={isConfirmPassVisible} setShowModal={setIsConfirmPassVisible} />

      <DeleteAccountModal
        open={isDeleteAccVisible}
        onClose={hideDeleteAccountModal}
      />
    </div>
  )
}
