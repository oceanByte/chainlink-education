import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view';
// import { getClassForCourse } from 'helpers/getInfoForCourse';
import { ICertificate } from 'reducers/certificate';
import { IAdditionalInfo } from 'helpers/coursesInfo';
import { ReactComponent as ChainLink } from '../../assets/chainlink101_certificate.svg';
import { ReactComponent as SolidityIntro } from '../../assets/solidityIntroduction_certificate.svg';
import { ReactComponent as Solidity } from '../../assets/solidityIntroduction_certificate.svg';
import { ReactComponent as Vrf } from '../../assets/vrfV2Introduction_certificate.svg';
import { ReactComponent as AdvancedVrf } from '../../assets/advancedCourseVRFv2_certificate.svg';
import { ReactComponent as ChainLinkKeep } from '../../assets/chainlinkKeepers_certificate.svg';
import { CourseNameType } from 'pages/Course/Course.data';


type PreviewCertificateViewProps = {
  additionalInfo: IAdditionalInfo;
  certificate: ICertificate | undefined;
  downloadCallback: (title: string) => void;
  isPublicView: boolean;
};



const getClassForCourse = (title: string, username: string, code: string) => {
  switch (title) {
    case CourseNameType.CHAINLINK_101:
      return (
        <div className='certificate-bg'>
          <ChainLink className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    case CourseNameType.SOLIDITY_INTRO:
      return (
        <div className='certificate-bg'>
          <SolidityIntro className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    case CourseNameType.SOLIDITY_102:
      return (
        <div className='certificate-bg'>
          <Solidity className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    case CourseNameType.VRF_V2:
      return (
        <div className='certificate-bg'>
          <Vrf className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    case CourseNameType.ADVANCED_VRF_V2:
      return (
        <div className='certificate-bg'>
          <AdvancedVrf className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    case CourseNameType.CHAINLINK_KEEPERS:
      return (
        <div className='certificate-bg'>
          <ChainLinkKeep className='certificate-container' />
          <div className='user-name'>{username}</div>
          <div className='user-code'>{code}</div>
        </div>
      );
    default:
      return '';
  }
};


export const PreviewCertificateView = ({
  additionalInfo,
  downloadCallback,
  certificate,
  isPublicView
}: PreviewCertificateViewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageContainerRef = useRef(null)

  useEffect(() => {
    if (certificate && additionalInfo) {
      setIsLoading(false);
    }
  }, [certificate, additionalInfo]);

  return (
    <div className='preview-page'>
      <div className="preview-page-section section-certificate">

        {isLoading ? (
          <div className='loader'><span className="loader-text">We are issuing your certificate</span></div>
        ) : (
          <div >
            {getClassForCourse(additionalInfo.title ?? "", certificate?.username ?? "", certificate?.code ?? "")}
          </div>
        )}
      </div>
      <div className='preview-page-section section-info'>
        <div className='title'>
          {additionalInfo.title}
        </div>
        <div className='description'>
          {additionalInfo.description}
        </div>
        {!isPublicView ? (
          <div className='downloadCertificate'>
            <MainButtonView
              isCompleted
              isPrimary
              hasArrowDown
              text='Download certificate'
              onClick={() => downloadCallback(additionalInfo.title)}
              loading={false}
              disabled={isLoading}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
