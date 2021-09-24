import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import * as React from 'react'

export const HomeView = () => {
  return (
    <div className='home'>
      <div className='home-wrapper intro'>
        <div className=' home-content home-intro'>
          <div className='home-intro-content'>
            <div className='home-intro-content__header h-font'>Learn to program with Chainlink Academy</div>
            <div className='home-intro-content__paragraph mt-30 p-font'>
              Chainlink's decentralized oracle network provides reliable, tamper&#8209;proof
              inputs and outputs for complex smart contracts on any blockchain
            </div>
            <button className='home-intro-content__button btn btn-green mt-40 h-font'>
              <span className='home-intro-content__button__text'> Get started for FREE </span><span
              className='arrow-upright' />
            </button>
          </div>
          <div className='home-intro__image' />
        </div>
      </div>
      <div className='home-ellipse' />
      <div className='home-content home-num-item'>
        <div className='home-num-item__image nft' />
        <div className='home-num-item-content'>
          <div className='home-num-item-content__header'>
            <div className='home-num-item-content__header__number h-font'>01</div>
            <div className='home-num-item-content__header__line' />
          </div>
          <div className='home-num-item-content__text'>
            <div className='home-num-item-content__text__header h-font'>
              NFT Certificate
            </div>
            <div className='home-num-item-content__text__paragraph p-font'>
              Complete the course and receive your certificate as a Non-Fungible Token
            </div>
          </div>
        </div>
      </div>
      <div className='home-content home-num-item reversed'>
        <div className='home-num-item__image etl' />
        <div className='home-num-item-content'>
          <div className='home-num-item-content__header half-hidden'>
            <div className='home-num-item-content__header__number h-font'>02</div>
            <div className='home-num-item-content__header__line' />
          </div>
          <div className='home-num-item-content__text'>
            <div className='home-num-item-content__text__header h-font'>
              Earn To Learn
            </div>
            <div className='home-num-item-content__text__paragraph p-font'>
              Get your Chainlink Academy mainnet account created for free on course completion
            </div>
          </div>
        </div>
      </div>
      <div className='home-content home-num-item'>
        <div className='home-num-item__image cnt' />
        <div className='home-num-item-content'>
          <div className='home-num-item-content__header half-hidden'>
            <div className='home-num-item-content__header__number h-font'>03</div>
            <div className='home-num-item-content__header__line' />
          </div>
          <div className='home-num-item-content__text'>
            <div className='home-num-item-content__text__header h-font'>
              Contribute to Chainlink Academy
            </div>
            <div className='home-num-item-content__text__paragraph p-font'>
              Join the builders of Chainlink Academy on Github. Earn Chainlink Academy if your PR is accepted
            </div>
          </div>
        </div>
      </div>
      <div className='home-content home-join'>
        <div className='home-join__header h-font'>JOIN THE FUTURE</div>
        <div className='home-join__line' />
        <div className='home-join-content'>
          <div className='home-join-content__header h-font'>The decentralized internet, or Web3, has been growing at a
            fast pace since its inception in 2009.
          </div>
          <div className='home-join-content-column'>
            <div className='home-join-content-column__paragraph p-font'>It is now a magnet to talent, with more smart developers
              joining every day. Web3 monthly developers are up +15% over 2020, following investments by venture capital
              of about $900M USD.
              <br/><br/>
              This is very similar to the growth of internet services in the early 2000s, and hints at significant
              development for years to come. Importantly, the infrastructure has matured and makes it easy to create
              dApps, the decentralized equivalent to Apps.
            </div>
            <button className='home-join-content-column__button btn btn-green mt-40 h-font'>
              <span className='home-join-content-column__button__text'>Join now</span>
              <span className='arrow-upright' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
