import * as React from 'react'
import { Link } from 'react-router-dom';

export const FooterView: any = () => (
  <div className="footer">
    <div className='footer-menu footer-content'>
        <div className='footer-menu-list p-font'>
          <Link to="/" className='footer-menu-list__item'>Academy</Link>
          <Link to="/" className='footer-menu-list__item'>Ecosystem</Link>
          <Link to="/" className='footer-menu-list__item'>Contact</Link>
          <Link to="/" className='footer-menu-list__item'>GitHub</Link>
          <Link to="/" className='footer-menu-list__item'>Documentation</Link>
          <Link to="/" className='footer-menu-list__item mr-0'>Upcoming events</Link>
        </div>
      <div className='footer-menu-social-media'>
        <a href="#" className='footer-menu-social-media__item item-discord' />
        <a href="#" className='footer-menu-social-media__item item-telegram' />
        <a href="#" className='footer-menu-social-media__item item-twitter mr-0' />
      </div>
    </div>
    <div className='footer-separator'>
      <div className='footer-separator__line' />
      <div className='footer-separator__arrow' />
    </div>
    <div className='footer-credentials footer-content'>
      <div className='footer-credentials__copyright p-font'>Copyright &#169; 2021 Chainlink. All rights reserved.</div>
      <div className='footer-credentials-menu p-font'>
        <Link to="/" className='footer-credentials-menu__item'>Privacy Policy</Link>
        <Link to="/" className='footer-credentials-menu__item'>Terms of Use</Link>
        <Link to="/" className='footer-credentials-menu__item mr-0'>Site Map</Link>
      </div>
      <div className='footer-credentials-social-media'>
        <a href="#" className='footer-credentials-social-media__item item-discord' />
        <a href="#" className='footer-credentials-social-media__item item-telegram' />
        <a href="#" className='footer-credentials-social-media__item item-twitter mr-0' />
      </div>
    </div>
  </div>
)
