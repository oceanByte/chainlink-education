import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'

import { Button } from "../Button/Button.controller";
import { HamburgerLeft } from '../Hamburger/Hamburger.controller'
// prettier-ignore
import { HeaderLoggedIn, HeaderLoggedOut, HeaderLogo, HeaderMenuItem, HeaderStyled } from "./HeaderAuth.style";


type HeaderViewProps = {
    user?: PublicUser
    removeAuthUserCallback: () => void
}

// Overall Navbar
export const HeaderView = ({user, removeAuthUserCallback}: HeaderViewProps) => {
    return (
        // <HeaderStyled> 
        //         <HamburgerLeft/>
        //     <Link to="/">
        //         <HeaderLogo alt="logo" width="100px" src="/logo.svg"/>
        //     </Link>
        //     {user ? loggedInHeader({user, removeAuthUserCallback}) : loggedOutHeader()}
        // </HeaderStyled>
        <div className = 'header-auth'>
            <div className="header-auth-button">
                <button>&#x2190;</button>
            </div>
            <div className="header-auth-logo"></div>
            <div className="header-auth-"></div>
        </div>
    )
}

function loggedOutHeader() {
  return (
    <HeaderLoggedOut>
        {/* <Link className={'get-started'} to="/chainlinkIntroduction/chapter-1">
            <Button text="GET STARTED" color="secondary"/>
        </Link> */}
      {/*<Link to="/terms">*/}
      {/*  <HeaderMenuItem>TERMS</HeaderMenuItem>*/}
      {/*</Link>*/}
      <Link to="/sign-up">
        <HeaderMenuItem>SIGN UP</HeaderMenuItem>
      </Link>
      <Link to="/login">
        <HeaderMenuItem>LOGIN</HeaderMenuItem>
      </Link>
    </HeaderLoggedOut>
  )
}

function loggedInHeader({user, removeAuthUserCallback}: HeaderViewProps) {
    return (
        <HeaderLoggedIn>
            {/*<Link to="/terms">*/}
            {/*    <HeaderMenuItem>TERMS</HeaderMenuItem>*/}
            {/*</Link>*/}
            <Link to={`/user/${user?.username}`}>
                <HeaderMenuItem>{user?.username}</HeaderMenuItem>
            </Link>
            <Link
                to="/"
                onClick={() => {
                    removeAuthUserCallback()
                }}
            >
                <HeaderMenuItem>LOGOUT</HeaderMenuItem>
            </Link>
        </HeaderLoggedIn>
    )
}

HeaderView.propTypes = {
    user: PropTypes.object,
    removeAuthUserCallback: PropTypes.func.isRequired,
}

HeaderView.defaultProps = {}
