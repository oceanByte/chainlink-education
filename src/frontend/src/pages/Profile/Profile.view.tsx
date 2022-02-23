import * as React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ChaptersListView } from 'app/App.components/ChaptersList/ChaptersListView'
import { Option } from 'app/App.components/Select/Select.view'
import { PublicUser } from 'shared/user/PublicUser'

import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
// import contract from '../../helpers/contracts.abi.json'
// import { ethers } from 'ethers'

import { ConfirmYouPassword } from '../../app/App.components/ConfirmYouPassword/ConfirmYouPassword'
import { DeleteAccount } from '../../app/App.components/DeleteAccount/DeleteAccount'
import { UpdatePassword } from '../../app/App.components/UpdatePassword/UpdatePassword'
import { chapterData } from '../Courses/chainlinkIntroduction/Chapters/Chapters.data'

type ProfileViewProps = {
  user?: PublicUser,
  activeCourse: Option,
  downloadCallback: () => void
}

export const ProfileView = ({
  user,
  activeCourse,
  downloadCallback
}: ProfileViewProps) => {

  const dispatch = useDispatch()

  let badgeUnlocked = false
  let counter = 0
  counter = user?.progress?.length ? user?.progress?.length : 0
  if (counter >= 7) badgeUnlocked = true

  const { search, pathname } = useLocation()
  const [section, setSection] = useState(1)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(true)
  const [isDeleteAccVisible, setIsDeleteAccVisible] = useState(true)
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (search) {
      setSection(() => +search[search.length-1])
    }
  }, [search])

  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {

      if (i !== 7){
        setPercent(() => ((i + 1) / chapterData.length) * 100)
      }
      else setPercent(() => 100)
    }
  })

  useEffect(() => {
    if (user && user.progress) {
      const userProgress = user && user.progress.length;
      setPercent(() => Math.floor((userProgress / chapterData.length) * 100))
    }
  // eslint-disable-next-line
  }, [])

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
        <div className='profile-page-section__header h-font'>Progress</div>
        <div className='profile-page-progress__bar'>
          <div className='profile-page-progress__bar__line'>
            <div className='profile-page-progress__bar__line__color' style={{ width: `${percent}%` }} />
          </div>
          <div className='profile-page-progress__bar__number'>{percent}%</div>
        </div>
        <div className='profile-page-progress-chapters p-font'>
          <ChaptersListView
            user={user}
            activeCourse={activeCourse}
            pathname={pathname}
          />
        </div>
        <div className='profile-page-progress__certificate-header h-font'>
          Certificate
        </div>
        {!badgeUnlocked ? (
        <div className='profile-page-progress__warning'> Keep going! Finish the Chainlink introduction course and download and share your certificate.
        </div>
        ) : (
          <div className='profile-page-progress__success'>Congratulations! You finished the Chainlink introduction course. Download and share your certificate now.
        </div>
        )}
        {badgeUnlocked ? (
        <div className='profile-page-progress-footer-box p-font'>
          <button className='profile-page-progress-footer-box__button btn btn-green btn-green' onClick={downloadCallback}>
            <span className='profile-page-progress-footer-box__button__text'> Download certificate </span>
            <span className='arrow-upright' />
          </button>
          <div className='profile-page-progress-footer-box__copy-link' onClick={copyToClipboard}>
            Copy certificate link
          </div>
        </div>

          ) : (<></>
        )}
        {/* <div className="profile-nft-certificate">
        <button className='profile-page-progress-footer-box__button btn btn-green' onClick={issueCertificate}>
            <span className='profile-page-progress-footer-box__button__text'> Issue NFT certificate </span>
          </button>
        </div> */}
        <div className='profile-page-progress__image' />
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
          {/* <div className='profile-page-account-info__email p-font'>
            <label htmlFor='profile-page-account-info__email__input'>Email address</label> */}
            {/* <div>{user?.email}</div> */}
            {/* <input
              type='email'
              id='profile-page-account-info__email__input'
              name='solution'
            /> */}
          {/* </div> */}
        </div>
        {/* <button className='btn btn-green'>
          <span className='profile-page-account-info__button__text'> Save changes </span>
          <span className='arrow-upright' />
        </button> */}
        <div onClick={() => setIsDeleteAccVisible(false)} className='profile-page-account-info__delete-account'>
          Delete your account
        </div>
      </div>
      <div
        className={`profile-page-reset-password profile-page-section ${section === 3 ? 'profile-page-visible' : ''}`}>
        <UpdatePassword setShowModal={setIsConfirmPassVisible} />
      </div>
      <ConfirmYouPassword showModal={isConfirmPassVisible} setShowModal={setIsConfirmPassVisible} />
      <DeleteAccount showModal={isDeleteAccVisible} setShowModal={setIsDeleteAccVisible} />
    </div>
  )
}
