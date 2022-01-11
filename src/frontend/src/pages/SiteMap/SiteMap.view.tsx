import React from 'react'
import { Link } from 'react-router-dom'

import{ SiteMapWrapp, Title, SiteMapContent } from './SiteMap.style'

const CHAPTERS = 8;

export const arrayFromLength = (c: number) => {
  return Array.from(new Array(c).keys()).map((k) => k + 1);
}

export const SiteMapView = () => {
  return (
    <SiteMapWrapp>
      <Title>
        Site Map
      </Title>

      <SiteMapContent>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <span>Authorization</span>

            <ul>
              <li><Link to="/sign-up">Sign up</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/forgot-password">Forgot password</Link></li>
              <li><Link to="/reset-password">Reset password</Link></li>
              <li><Link to="/change-password">Change password</Link></li>
            </ul>
          </li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <span>Chapters</span>

            <ul>
              {arrayFromLength(CHAPTERS).map((item) => (
                <li key={item}><Link to={`/chainlinkIntroduction/chapter-${item}`}>chapter-{item}</Link></li>
              ))}
            </ul>
          </li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/thank-you">Thank you</Link></li>
        </ul>
      </SiteMapContent>
    </SiteMapWrapp>
  )
}