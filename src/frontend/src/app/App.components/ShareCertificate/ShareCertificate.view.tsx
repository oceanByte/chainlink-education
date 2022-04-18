import React, { useState, useEffect, useRef } from 'react'

import classnames  from 'classnames'

interface IShareCertificate {
  className?: string
}

export const ShareCertificate = ({ className }: IShareCertificate) => {
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
              <div className='share-list-item linkedin'></div>
            </li>
            <li className='share-list-item twitter'>
              <div className='share-list-item twitter'></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}