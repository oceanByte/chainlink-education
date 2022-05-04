import React from 'react'

import { useHistory } from 'react-router-dom'

import classnames from 'classnames';
import { UseCertificateStyled } from './UseCerificate.style';
import { MainButtonView } from 'app/App.components/MainButton/MainButton.view';
import { ShareCertificate } from 'app/App.components/ShareCertificate/ShareCertificate.view';
import { PublicUser } from 'shared/user/PublicUser';
import { IAdditionalInfo } from 'helpers/coursesInfo';

interface IUseCertificate {
  isPrimary?: boolean
  isSecondary?: boolean
  isShowList: boolean
  additionalInfo: IAdditionalInfo
  user?: PublicUser
  nextPath: string
}

export const UseCertificate = ({ isPrimary, isSecondary, additionalInfo, isShowList, user, nextPath }: IUseCertificate) => {
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
              onClick={() => history.push(nextPath)}
              loading={false}
              disabled={false}
            />
          </li>
          <li>
            <ShareCertificate additionalInfo={additionalInfo} username={user?.username} />
          </li>
        </ul>
      </div>
    </UseCertificateStyled>
  )
}