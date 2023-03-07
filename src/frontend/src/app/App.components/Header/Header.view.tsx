import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Jazzicon } from '@ukstv/jazzicon-react';

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'

import { CoursesListView } from '../HeaderCoursesList/HeaderCoursesListView'

type HeaderViewProps = {
  user?: PublicUser
  removeAuthUserCallback: () => void
  pathname: string
  activeCourse: Option
}

export const HeaderView = ({ user, removeAuthUserCallback, pathname, activeCourse }: HeaderViewProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isShowList, setIsShowList] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (window.innerWidth > 1024) {
        setIsBurgerMenuOpen(false)
      }
    })
  }, [])

  const scrollTo = () => {
    setIsBurgerMenuOpen(false)
    const element: any = document.querySelector('.scrollTo')
    if (element != null) {
      window.scrollTo({ top: element.offsetTop })
    }
  }

  const formatUsername = (username: string) => {
    const usernameArr = username.split('_')

    if (usernameArr.length >= 2) {
      return `${usernameArr[0][0].toUpperCase()}${usernameArr[1][0].toUpperCase()}`
    }

    return `${usernameArr[0][0].toUpperCase()}`
  }


  const showMenu = () => {
    setShowUserMenu((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowUserMenu(() => false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const loggedOutHeader = (
    <div className="header-menu-log">
      <Link to="/login" className="header-menu-log__link link__signin">
        Sign in
      </Link>
      <Link to="/sign-up" className="header-menu-log__link link__signup ml-10">
        Sign up
      </Link>
    </div>
  )

  const loggedInHeader = (
    <>
      <div className="header-menu-user">
        <div ref={wrapperRef} className='header-menu-btn' onClick={showMenu}>
          {
            user && user.publicAddress
              ? (
                <div className="header-menu-user__icon">
                  <Jazzicon address={user?.publicAddress} />
                </div>
              ) : (
                <div className="header-menu-user__circle">{formatUsername(user?.username || 'U')}</div>
              )
          }
          <div className="header-menu-user__name">
            {user?.username} <span>&#9660;</span>
          </div>
        </div>

        <div className={classnames('header-menu-user-menu', showUserMenu && 'show')}>
          <div className="header-menu-user-menu__item">
            <Link to="/profile/progress">Progress</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/profile/certificates">Certificate</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/profile/account-info">Account info</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/profile/reset-password">Reset password</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <div onClick={removeAuthUserCallback}>Log out</div>
          </div>
        </div>
      </div>
      {/* <div className={additionalUserMenu}>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Progress & Certificate</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Account info</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Reset password</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Log out</div>
      </div> */}
    </>
  )

  const showListAcademy = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const showListAcademyMobile = () => {
    setIsShowList(!isShowList)
  }

  return (
    <>
      <div className="header">
        <Link to="/" className="header__link" />
        <div className="header-menu">
          <div className="header-menu-list">
            <div className="header-menu-list__item">
              <button className="btn" onClick={showListAcademy}>
                Courses <span>&#9660;</span>
              </button>
              <div className={classnames('courses-list', !isDropdownOpen && 'hidden')}>
                <CoursesListView user={user} pathname={pathname} />
              </div>
            </div>
            {user ? (
              <div className="header-menu-list__item">
                <button className="ml-30 btn" onClick={() => history.push('/profile/progress')}>
                  Your Progress
                </button>
              </div>
            ) : null}
            <div className="header-menu-list__item">
              <button className="ml-30 btn" onClick={() => window.open('https://chain.link', '_blank')}>
                Ecosystem
              </button>
              <span className='arrow-upright' />
            </div>
          </div>
          <div className="header-menu-cred lg">{user ? loggedInHeader : loggedOutHeader}</div>
          <div
            className={`header-menu__burger-icon ${isBurgerMenuOpen ? 'header-menu__exit-icon' : ''}`}
            onClick={() => {
              isDropdownOpen && setIsDropdownOpen(false)
              setIsBurgerMenuOpen(!isBurgerMenuOpen)
            }}
          />
        </div>

        <div className={`header-list-mobile ${isBurgerMenuOpen ? '' : 'hidden'}`}>
          <div className="header__item-border" />
          <div className="header-list-mobile__item">
            <button className="btn" onClick={showListAcademyMobile}>
              Courses <span>&#9660;</span>
            </button>
            <div className={classnames('courses-list', isShowList && 'show')}>
              <CoursesListView user={user} pathname={pathname} isMobile />
            </div>
          </div>
          <div className="header__item-border" />
          <div className="header-list-mobile__item">
            <button className="btn" onClick={() => history.push('/profile/progress')}>
              Your Progress
            </button>
          </div>
          <div className="header-list-mobile-border" />
          <div className="header-list-mobile__item">
            <button className="btn">Ecosystem</button>
            <span className="arrow-upright" />
          </div>
          <div className="header__item-border" />
          <div className="header-list-mobile__item">
            <button className="btn" onClick={scrollTo}>
              Contact
            </button>
          </div>
          <div className="header__item-border" />
          <div className="header-dropdown-user-menu xs">{!user ? loggedOutHeader : null}</div>
        </div>
      </div>
      <div className={`bright-background ${isBurgerMenuOpen ? '' : 'opacity-0'}`} />
    </>
  )
}

// function loggedOutHeader() {
//   return (
//     <div className="header-menu-log ml-50">
//       <Link to="/login" className="header-menu-log__link link__signin">
//         Sign in
//       </Link>
//       <Link to="/sign-up" className="header-menu-log__link link__signup ml-10">
//         Sign up
//       </Link>
//     </div>
//   )
// }

// function loggedInHeader() {
//   return (
//     <>
//       <div className="header-menu-user">
//         <div className="header-menu-user__circle">JS</div>
//         <div className="header-menu-user__name">
//           John Smith <span>&#9660;</span>
//         </div>
//       </div>
//       <div className="header-menu-user-menu">
//         <div className="header__item-border" />
//         <div className="header-menu-user-menu__item">Progress & Certificate</div>
//         <div className="header__item-border" />
//         <div className="header-menu-user-menu__item">Account info</div>
//         <div className="header__item-border" />
//         <div className="header-menu-user-menu__item">Reset password</div>
//         <div className="header__item-border" />
//         <div className="header-menu-user-menu__item">Log out</div>
//       </div>
//     </>
//   )
// }

HeaderView.propTypes = {
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

HeaderView.defaultProps = {}
