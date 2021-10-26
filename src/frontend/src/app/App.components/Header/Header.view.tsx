import * as PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { useState } from 'react'
import { isConstructorDeclaration } from 'typescript'

type HeaderViewProps = {
  user?: PublicUser
  removeAuthUserCallback: () => void
}

export const HeaderView = ({ user, removeAuthUserCallback }: HeaderViewProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  console.log('isDropdownOpen', isDropdownOpen)
  console.log('isBurgerMenuOpen', isBurgerMenuOpen)

  useEffect(() => {
    console.log(window)
  }, [])

  const deleteAnchorLink = () => {
    document.querySelector(window.location.hash)
  }

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
            <button className="header-menu-list__item ml-30 btn">
              <a href="#contactus">Contact</a>
            </button>
          </div>
          <div className="header-menu-cred">{!user ? loggedInHeader() : loggedOutHeader()}</div>
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
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 2: <span className="h-font">What are Contracts?</span>
            </span>
            <div className="header-chapters__item__completion completed">COMPLETED</div>
          </div>
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 3:
              <span className="h-font">Digital Agreements - What we have today</span>
            </span>
            <div className="header-chapters__item__completion continue">CONTINUE</div>
          </div>
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 4: <span className="h-font">Blockchain Introduction</span>
            </span>
            <div className="header-chapters__item__completion"></div>
          </div>
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 5: <span className="h-font">How Blockchains Work Intro</span>
            </span>
            <div className="header-chapters__item__completion"></div>
          </div>
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 6: <span className="h-font">Smart Contracts - The Future</span>
            </span>
            <div className="header-chapters__item__completion "></div>
          </div>
          <div className="header-chapters__item">
            <span className="header-chapters__item__name">
              Chapter 7:
              <span className="h-font">The Smart Contract Connectivity Problem</span>
            </span>
            <div className="header-chapters__item__completion"></div>
          </div>
          <div className="header-chapters__item no-bb">
            <span className="header-chapters__item__name">
              Chapter 8: <span className="h-font">Centralized Oracles</span>
            </span>
            <div className="header-chapters__item__completion"></div>
          </div>
        </div>
        <div className={`header-list ${isBurgerMenuOpen ? '' : 'hidden'}`}>
          <div className="header__item-border" />
          <button className="header-list__item with-bt btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Academy <span>&#9660;</span>
          </button>
          <div className="header__item-border" />
          <button className="header-list__item btn">Ecosystem</button>
          <div className="header__item-border" />
          <button className="header-list__item btn" onClick={() => setIsBurgerMenuOpen(false)}>
            <a href="#contactus">Contact</a>
          </button>
          <div className="header__item-border" />
          <div className="header-dropdown-user-menu">{!user ? loggedInHeader() : loggedOutHeader()}</div>
        </div>
      </div>
      <div className={`bright-background ${isBurgerMenuOpen ? '' : 'opacity-0'}`} />
    </>
  )
}

function loggedOutHeader() {
  return (
    <div className="header-menu-log ml-50">
      <Link to="/login" className="header-menu-log__link link__signin">
        Sign in
      </Link>
      <Link to="/sign-up" className="header-menu-log__link link__signup ml-10">
        Sign up
      </Link>
    </div>
  )
}

function loggedInHeader() {
  return (
    <>
      <div className="header-menu-user">
        <div className="header-menu-user__circle">JS</div>
        <div className="header-menu-user__name">
          John Smith <span>&#9660;</span>
        </div>
      </div>
      <div className="header-menu-user-menu">
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Progress & Certificate</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Account info</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Reset password</div>
        <div className="header__item-border" />
        <div className="header-menu-user-menu__item">Log out</div>
      </div>
    </>
  )
}

HeaderView.propTypes = {
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

HeaderView.defaultProps = {}
