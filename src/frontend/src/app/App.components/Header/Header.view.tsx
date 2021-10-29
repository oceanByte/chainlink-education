import * as PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { useState } from 'react'
import { isConstructorDeclaration } from 'typescript'
import classnames from 'classnames'

type HeaderViewProps = {
  user?: PublicUser
  removeAuthUserCallback: () => void
}

export const HeaderView = ({ user, removeAuthUserCallback }: HeaderViewProps) => {
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

  const loggedOutHeader = (
    <div className="header-menu-log ml-50">
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
        <div className="header-menu-user__circle">JS</div>
        <div className="header-menu-user__name">
          John Smith <span>&#9660;</span>
        </div>
        <div className={additionalUserMenu}>
          <div className="header-menu-user-menu__item">
            <Link to="/profile">Progress & Certificate</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/profile">Account info</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/reset-password">Reset password</Link>
          </div>
          <div className="header-menu-user-menu__item">
            <Link to="/login">Log out</Link>
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
              Academy <span>&#9660;</span>
            </button>
            <button className="header-menu-list__item ml-30 btn">Ecosystem</button>
          </div>
          <div className="header-menu-cred">{!user ? loggedInHeader : loggedOutHeader}</div>
          <div
            className={`header-menu__burger-icon ${isBurgerMenuOpen ? 'header-menu__exit-icon' : ''}`}
            onClick={() => {
              isDropdownOpen && setIsDropdownOpen(false)
              setIsBurgerMenuOpen(!isBurgerMenuOpen)
            }}
          />
        </div>
        <div className={`header-chapters p-font ${isDropdownOpen ? '' : 'hidden'}`}>
          <Link to="/chainlinkIntroduction/chapter-1" className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 1: <span className="h-font">What will this course cover?</span>
            </span>
            <div className="header-chapters__item__completion completed">COMPLETED</div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-2" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 2: <span className="h-font">What are Contracts?</span>
              </span>
              <div className="header-chapters__item__completion completed">COMPLETED</div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-3" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 3:
                <span className="h-font">Digital Agreements - What we have today</span>
              </span>
              <div className="header-chapters__item__completion continue">CONTINUE</div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-4" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 4: <span className="h-font">Blockchain Introduction</span>
              </span>
              <div className="header-chapters__item__completion"></div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-5" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 5: <span className="h-font">How Blockchains Work Intro</span>
              </span>
              <div className="header-chapters__item__completion"></div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-6" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 6: <span className="h-font">Smart Contracts - The Future</span>
              </span>
              <div className="header-chapters__item__completion "></div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-7" className="header-chapters__item">
            <div className="header-chapters__item">
              <span className="header-chapters__item__name">
                Chapter 7:
                <span className="h-font">The Smart Contract Connectivity Problem</span>
              </span>
              <div className="header-chapters__item__completion"></div>
            </div>
          </Link>
          <Link to="/chainlinkIntroduction/chapter-8" className="header-chapters__item">
            <div className="header-chapters__item no-bb">
              <span className="header-chapters__item__name">
                Chapter 8: <span className="h-font">Centralized Oracles</span>
              </span>
              <div className="header-chapters__item__completion"></div>
            </div>
          </Link>
        </div>
        <div className={`header-list ${isBurgerMenuOpen ? '' : 'hidden'}`}>
          <div className="header__item-border" />
          <button className="header-list__item with-bt btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Academy <span>&#9660;</span>
          </button>
          <div className="header__item-border" />
          <button className="header-list__item btn">Ecosystem</button>
          <div className="header__item-border" />
          <button className="header-list__item btn" onClick={scrollTo}>
            Contact
          </button>
          <div className="header__item-border" />
          <div className="header-dropdown-user-menu">{!user ? loggedInHeader : loggedOutHeader}</div>
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
