import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

type HeaderViewProps = {
  user?: PublicUser,
  removeAuthUserCallback: () => void
}

export const HeaderView = ({ user, removeAuthUserCallback }: HeaderViewProps) => {
  return (
    <div className='header'>
      <Link to='/' className='header__link' />
      <div className='header-menu'>
        <div className='header-menu-list'>
          <button className='header-menu-list__item btn'>Academy <span>&#9660;</span></button>
          <button className='header-menu-list__item ml-30 btn'>Ecosystem</button>
          <button className='header-menu-list__item ml-30 btn'>Contact</button>
        </div>
        {user ? loggedInHeader() : loggedOutHeader()}
        <div className='header-menu__burger-icon' />
      </div>
    </div>
  )
}

function loggedOutHeader() {
  return (
    <div className='header-menu-log ml-50'>
      <Link to='/login' className='header-menu-log__link link__signin'>
        Sign in
      </Link>
      <Link to='/sign-up' className='header-menu-log__link link__signup ml-10'>
        Sign up
      </Link>
    </div>
  )
}

function loggedInHeader() {
  return (
    <div className='header-menu-user'>
      <div className='header-menu-user__circle'>JD</div>
      <div className='header-menu-user__name'>John Doe <span>&#9660;</span></div>
    </div>
  )
}

HeaderView.propTypes = {
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

HeaderView.defaultProps = {}
