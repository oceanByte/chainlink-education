import React from 'react'

import { useHistory } from 'react-router-dom'

import classnames from 'classnames';
import { UseCertificateStyled } from './UseCerificate.style';
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view';
import { ShareCertificate } from 'app/App.components/ShareCertificate/ShareCertificate.view';

interface IUseCertificate {
  isPrimary?: boolean
  isSecondary?: boolean
  isShowList: boolean
  additionalInfo: any
}

export const UseCertificate = ({ isPrimary, isSecondary, additionalInfo, isShowList }: IUseCertificate) => {
  const history = useHistory()

  return (
    <UseCertificateStyled className='overall-progress'>
      <div className={classnames('useCertificate__list', isShowList && 'show')}>
        <ul>
          <li>
            <MainButtonView
              isCompleted
              isPrimary={isPrimary}
              isSecondary={isSecondary}
              hasArrowDown
              text='Download certificate'
              onClick={() => history.push(`/description/${additionalInfo.urlCourse}`)}
              loading={false}
              disabled={false}
            />
          </li>
          <li>
            <ShareCertificate />
          </li>
        </ul>
      </div>
    </UseCertificateStyled>
  )
}