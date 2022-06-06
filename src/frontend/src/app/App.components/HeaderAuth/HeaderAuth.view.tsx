import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

import Header from '../Header/Header.controller'

import Arrow from '../../../assets/Vector.png'
import Logo from '../../../assets/logo.png'

type HeaderViewProps = {
  user?: PublicUser
  removeAuthUserCallback: () => void,
  isSignUp?: boolean
}

// Overall Navbar
export const HeaderView = ({ user, removeAuthUserCallback, isSignUp }: HeaderViewProps) => {
  const history = useHistory()

  return (
    // <HeaderStyled>
    //         <HamburgerLeft/>
    //     <Link to="/">
    //         <HeaderLogo alt="logo" width="100px" src="/logo.svg"/>
    //     </Link>
    //     {user ? loggedInHeader({user, removeAuthUserCallback}) : loggedOutHeader()}
    // </HeaderStyled>
    <>
      {user ? (
        <div className="header-auth isUser">
        <Header />
        
        
        {/* {user ? loggedInHeader({ user, removeAuthUserCallback }) : loggedOutHeader()} */}
        {/* loggedInHeader({(user, removeAuthUserCallback)}) */}
      </div>
      ) : (
        <div className="header-auth">
          <div className="header-auth-button">
            <button onClick={() => history.goBack()}>
              <img src={Arrow} alt="arrow" width="12" height="12" />
              <span>Back</span>
            </button>
          </div>
          <div className="header-auth-logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          {isSignUp? (
            <div className="header-auth-sign">
              <div className="header-auth-sign-text">Already have an account?</div>
              <div className="header-auth-sign-button">
                <Link to="/login">
                  <button>Sign in</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="header-auth-sign">
              <div className="header-auth-sign-text">Don't have an account yet?</div>
              <div className="header-auth-sign-button">
                <Link to="/sign-up">
                  <button>Sign up</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

HeaderView.propTypes = {
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

HeaderView.defaultProps = {}
