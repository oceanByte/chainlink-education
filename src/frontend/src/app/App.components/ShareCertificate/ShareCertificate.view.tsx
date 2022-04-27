import React, { useState, useEffect, useRef } from 'react'

import {
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import classnames  from 'classnames'
import { IAdditionalInfo } from 'helpers/coursesInfo';

interface IShareCertificate {
  className?: string
  additionalInfo: IAdditionalInfo
  username?: string
}

export const ShareCertificate = ({ className, additionalInfo, username }: IShareCertificate) => {

  const shareUrl = `https://www.chainlink.education/verify/${additionalInfo.urlCourse}/${username}`
  const message = `I just finished the '${additionalInfo.title}'. Here is my certificate:`

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isShowList, setIsShowList] = useState(false);

  const showList = () => {
    setIsShowList((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowList(() => false);
      }
    }
    if (isShowList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowList]);

  return (
    <div className='social-networks__wrapp'>
      <ul className="menu bottomRight">
        <li className={classnames('share top right', isShowList && 'show', className)}>
          <div ref={wrapperRef} className='share-btn' onClick={showList}></div>
          <ul className="submenu">
            <li className='share-list-item linkedin'>
              <LinkedinShareButton
                url={shareUrl}
                title={message}
              >
                <div className='share-list-item linkedin'></div>
              </LinkedinShareButton>
              
            </li>
            <li className='share-list-item twitter'>
              <TwitterShareButton
                url={shareUrl}
                title={message}
              >
                <div className='share-list-item twitter'></div>
              </TwitterShareButton>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}