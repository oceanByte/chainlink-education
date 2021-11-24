import * as React from 'react'
import { Link } from 'react-router-dom'

export const FooterView: any = () => (
  <div className="footer">
    <div className="footer-menu footer-content">
      <div className="footer-menu-list p-font">
        <a href="https://elastic-johnson-1b0374.netlify.app/" className="footer-menu-list__item">
          Academy
        </a>
        <a href="https://chain.link/" className="footer-menu-list__item">
          Ecosystem
        </a>
        <a href="mailto:chainlink@academy.io" className="footer-menu-list__item">
          Contact
        </a>
        <a href="https://github.com/oceanByte/chainlink-eduction/tree/dev" className="footer-menu-list__item">
          GitHub
        </a>
        <a href="https://docs.chain.link/" className="footer-menu-list__item">
          Documentation
        </a>
        <a href="https://chain.link/community/events" className="footer-menu-list__item mr-0">
          Upcoming events
        </a>
      </div>
      <div className="footer-menu-social-media">
        <a href="https://discord.com/invite/aSK4zew" className="footer-menu-social-media__item item-discord" />
        <a href="https://t.me/chainlinkofficial" className="footer-menu-social-media__item item-telegram" />
        <a href="https://twitter.com/chainlink" className="footer-menu-social-media__item item-twitter mr-0" />
      </div>
    </div>
    <div className="footer-separator">
      <div className="footer-separator__line" />
      <div
        className="footer-separator__arrow"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo(0, 0)
        }}
      />
    </div>
    <div className="footer-credentials footer-content">
      <div className="footer-credentials__copyright p-font">Copyright &#169; 2021 Chainlink. All rights reserved.</div>
      <div className="footer-credentials-menu p-font">
        <Link to="/" className="footer-credentials-menu__item">
          Privacy Policy
        </Link>
        <Link to="/terms" className="footer-credentials-menu__item">
          Terms of Use
        </Link>
        <Link to="/site-map" className="footer-credentials-menu__item mr-0">
          Site Map
        </Link>
      </div>
      <div className="footer-credentials-social-media">
        <a href="https://discord.com/invite/aSK4zew" className="footer-credentials-social-media__item item-discord" />
        <a href="https://t.me/chainlinkofficial" className="footer-credentials-social-media__item item-telegram" />
        <a href="https://twitter.com/chainlink" className="footer-credentials-social-media__item item-twitter mr-0" />
      </div>
    </div>
  </div>
)
