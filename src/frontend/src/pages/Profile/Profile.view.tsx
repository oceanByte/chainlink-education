import * as React from 'react'
import { useState,useCallback } from 'react'
import { Switch, NavLink, Route } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

import { PublicUser } from 'shared/user/PublicUser'

// import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
// import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
// import contract from '../../helpers/contracts.abi.json'
// import { ethers } from 'ethers'

import { ConfirmYouPassword } from '../../app/App.components/ConfirmYouPassword/ConfirmYouPassword'
import { UpdatePassword } from '../../app/App.components/UpdatePassword/UpdatePassword'
import { Certificates } from 'app/App.components/Profile/Certificates/Certificates.controller';
import { OverallProgress } from 'app/App.components/Profile/OverallProgress/OveralProgress.controller';
import { AccountInfo } from 'app/App.components/Profile/AccountInfo/AccountInfo.view';
import { getCoursesData } from 'helpers/coursesInfo'
import { CourseProgress } from 'app/App.components/Profile/CourseProgress/CourseProgress.controller'
import { Error404 } from 'pages/Error404/Error404.controller'

type ProfileViewProps = {
  user?: PublicUser,
  changeEmailCallback: ({email}: {email: string})=> void,
  deleteAccountCallback: ()=> void
}

export const ProfileView = ({
  user,
  changeEmailCallback,
  deleteAccountCallback,
}: ProfileViewProps) => {
  const [isShow, setIsShow] = useState(false);
  // const dispatch = useDispatch()
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(true)

  const infoCourses = getCoursesData(user?.courses || []);

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(`https://www.chainlink.education/certificate/${user?.username}`);
  //   dispatch(showToaster(SUCCESS, 'Certificate link copied', 'You can share this link now.'));
  // }

  const showSubList = useCallback((isShow: boolean) => {
    setIsShow(() => isShow)
  }, [])

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
          <NavLink
            to={`/profile/progress`}
            className={`profile-page-sections-content__item profile-item-progress`}
            >
              <div className='profile-icon' />
              <div className='profile-text'>Progress</div>
          </NavLink>
          {user && isShow ? (
            <div className='progress-courses__wrapper'>
              {user.courses ? user.courses.map((course) => {
                const additionalInfo = infoCourses.courses[course.title]
                return (
                  <div className='progress-courses__item' key={course.title}>
                    <NavLink
                      to={`/profile/progress/${additionalInfo.urlCourse}`}
                      className={`profile-page-sections-content__item profile-item-progress`}
                    >
                      {course.title}
                    </NavLink>
                  </div>
                )
              }): null}
            </div>
          ) : null }
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/certificates`}
            className={`profile-page-sections-content__item profile-item-certificate`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Certificate</div>
          </NavLink>
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/account-info`}
            className={`profile-page-sections-content__item profile-item-info`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Account Info</div>
          </NavLink>
          <div className='profile-page-sections-content__line' />
          <NavLink
            to={`/profile/reset-password`}
            className={`profile-page-sections-content__item profile-item-reset`}
          >
            <div className='profile-icon' />
            <div className='profile-text'>Reset Password</div>
          </NavLink>
        </div>
      </div>
      <div className={`profile-page-progress profile-page-section profile-page-visible`}>
        <Switch>
          <Route path={`/profile/progress`} exact>
            <OverallProgress user={user} courses={user?.courses}/>
          </Route>
          <Route path={`/profile/progress/:courseId`} exact>
            <CourseProgress user={user} courses={user?.courses} showSubList={showSubList}/>
          </Route>
          <Route path={`/profile/certificates`}>
            <Certificates user={user} />
          </Route>
          <Route path={`/profile/account-info`}>
            <AccountInfo
              user={user}
              changeEmailCallback={changeEmailCallback}
              deleteAccountCallback={deleteAccountCallback}
            />
          </Route>
          <Route path={`/profile/reset-password`}>
            <UpdatePassword setShowModal={setIsConfirmPassVisible} />
            <ConfirmYouPassword showModal={isConfirmPassVisible} setShowModal={setIsConfirmPassVisible} />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
        {/* <OverallProgress user={user} courses={user?.courses}/> */}
        {/* <CoursesListView
          user={user}
          copyToClipboard={copyToClipboard}
          downloadCallback={downloadCallback}
          getCertificateCallback={getCertificateCallback}
        /> */}
      </div>
    </div>
  )
}
