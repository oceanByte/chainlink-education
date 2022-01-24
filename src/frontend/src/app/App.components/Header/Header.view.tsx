import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

import { ChapterData } from '../../../pages/Chapter/Chapter.controller'
import { chaptersByCourse } from '../../../pages/Course/Course.data'
import { ChaptersListView } from '../ChaptersList/ChaptersListView'
import { Option } from '../Select/Select.view'

type HeaderViewProps = {
  user?: PublicUser
  removeAuthUserCallback: () => void,
  pathname: string,
  activeCourse: Option,
}

export const HeaderView = ({
  user,
  removeAuthUserCallback,
  pathname,
  activeCourse
}: HeaderViewProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(true)

  const additionalUserMenu = classnames('header-menu-user-menu', {
    'header-menu-user-menu-show': showUserMenu,
  })

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
    const usernameArr = username.split('_');

    if (usernameArr.length >= 2) {
      return `${usernameArr[0][0].toUpperCase()}${usernameArr[1][0].toUpperCase()}`
    }

    return `${usernameArr[0][0].toUpperCase()}`
  }

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
      <div className="header-menu-user" onClick={() => setShowUserMenu((st) => !st)}>
        <div className="header-menu-user__circle">{formatUsername(user?.username || "U")}</div>
        <div className="header-menu-user__name">
          {user?.username} <span>&#9660;</span>
        </div>
        <div className={additionalUserMenu}>
          <div className="header-menu-user-menu__item">
            <Link to="/profile">Progress & Certificate</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/profile?accountInfo=2">Account info</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/reset-password">Reset password</Link>
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

  return (
    <>
      <div className="header">
        <Link to="/" className="header__link" />
        <div className="header-menu">
          <div className="header-menu-list">
            <button className="header-menu-list__item btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Curriculum <span>&#9660;</span>
            </button>
            <button
              className="header-menu-list__item ml-30 btn"
              onClick={() => window.open('https://chain.link/', '_blank')}>
              Ecosystem
            </button>
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
        <div className={classnames('chapters-list', !isDropdownOpen && 'hidden')}>
          <ChaptersListView
            user={user}
            activeCourse={activeCourse}
            pathname={pathname}
          />
        </div>
        <div className={`header-list ${isBurgerMenuOpen ? '' : 'hidden'}`}>
          <div className="header__item-border" />
          <button className="header-list__item with-bt btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Curriculum <span>&#9660;</span>
          </button>
          <div className="header__item-border" />
          <button className="header-list__item btn">Ecosystem</button>
          <div className="header__item-border" />
          <button className="header-list__item btn" onClick={scrollTo}>
            Contact
          </button>
          <div className="header__item-border" />
          <div className="header-dropdown-user-menu xs">{user ? loggedInHeader : loggedOutHeader}</div>
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
