import React, { useState } from 'react'

import classnames from 'classnames'

import { MainButtonView } from 'app/App.components/MainButton/MainButton.view'
import { getClassForCourse } from 'helpers/getInfoForCourse'
import { ICertificate } from 'reducers/certificate'
import { IAdditionalInfo } from 'helpers/coursesInfo'


type PreviewCertificateViewProps = {
  additionalInfo: IAdditionalInfo
  certificate: ICertificate | undefined
  downloadCallback: (title: string) => void
  isPublicView: boolean
}

export const PreviewCertificateView = ({
  additionalInfo,
  downloadCallback,
  certificate,
  isPublicView
}: PreviewCertificateViewProps) => {

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='preview-page'>
      <div className="preview-page-section section-certificate">
        <div className={classnames('certificate-bg', getClassForCourse(additionalInfo.title || ''))}>
          {isLoading ? (
            <>
              <div className='user-name'>Loading...</div>
              <div className='user-code'>Loading...</div>
            </>
          ) : (
            <>
              <div className='user-name'>{certificate?.username}</div>
              <div className='user-code'>{certificate?.code}</div>
            </>
          )}
        </div>
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
              disabled={false}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
