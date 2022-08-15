import * as React from 'react'
import { Link } from 'react-router-dom'

export const FooterView: any = ({ hideLinks }: { hideLinks: boolean }) => (
  <div className="footer">
    <div className="footer-menu footer-content">
      <div className="footer-menu-list p-font" style={{ opacity: hideLinks ? '0' : '1' }}>
        <a
          href="https://chainlink-education-app.herokuapp.com/"
          rel="noopener noreferrer"
          target="_blank"
          className="footer-menu-list__item"
        >
          Academy
        </a>
        <a
          href="https://chain.link/"
          rel="noopener noreferrer"
          target="_blank"
          className="footer-menu-list__item"
        >
          Ecosystem
        </a>
        <a
          href="mailto:chainlink@academy.io"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-menu-list__item"
        >
          Contact
        </a>
        <a
          href="https://github.com/oceanByte/chainlink-eduction/tree/dev"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-menu-list__item"
        >
          GitHub
        </a>
        <a
          href="https://docs.chain.link/"
          target="_blank"
          className="footer-menu-list__item"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          href="https://chain.link/community/events"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-menu-list__item mr-0"
        >
          Upcoming events
        </a>
      </div>
      <div className="footer-menu-social-media">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a
          href="https://discord.com/invite/aSK4zew"
          rel="noopener noreferrer"
          target="_blank"
          className="footer-menu-social-media__item item-discord" />
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://t.me/chainlinkofficial"
          rel="noopener noreferrer"
          target="_blank"
          className="footer-menu-social-media__item item-telegram" />
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://twitter.com/chainlink"
          rel="noopener noreferrer"
          target="_blank"
          className="footer-menu-social-media__item item-twitter mr-0" />
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
      <div className="footer-credentials__copyright p-font">
        2022
        <span><b>{` | v${process.env.REACT_APP_VERSION} | `}</b></span>
        <span><b>Changelog</b></span>
      </div>
      <div className="footer-credentials-menu p-font">
        <Link to="/terms" className="footer-credentials-menu__item">
          Terms of Use
        </Link>
        <Link to="/site-map" className="footer-credentials-menu__item mr-0">
          Site Map
        </Link>
      </div>
      <div className="footer-credentials-social-media">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://discord.com/invite/aSK4zew" className="footer-credentials-social-media__item item-discord" />
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://t.me/chainlinkofficial" className="footer-credentials-social-media__item item-telegram" />
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="https://twitter.com/chainlink" className="footer-credentials-social-media__item item-twitter mr-0" />
      </div>
    </div>
  </div>
)
