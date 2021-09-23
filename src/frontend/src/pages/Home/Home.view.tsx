import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import * as React from 'react'

export const HomeView = () => {
  return (
    <div className='home'>
      <div className='home-wrapper-intro'>
        <div className='home-intro'>
          <div className='home-intro-content'>
            <div className='home-intro-content__header'>Learn to program with Chainlink Academy</div>
            <div className='home-intro-content__paragraph mt-30'>
              Chainlink's decentralized oracle network provides reliable, tamper&#8209;proof
              inputs and outputs for complex smart contracts on any blockchain
            </div>
            <button className='home-intro-content__button btn mt-40'>
              <span className='home-intro-content__button__text'> Get started for FREE </span><span className='arrow-upright' />
            </button>
          </div>
          <div className='home-intro__image' />
        </div>
      </div>
      <div className='home-ellipse' />
      <div className='home-nft'>
        <div className='home-nft__image' />
        <div className='home-nft-content'>
          <div className='home-nft-content__header'>
            <div className='home-nft-content__header__number'>01</div>
            <div className='home-nft-content__header__line' />
          </div>
          <div className='home-nft-content__text'>
            <div className='home-nft-content__text__header'>
              NFT Certificate
            </div>
            <div className='home-nft-content__text__paragraph'>
              Complete the course and receive your certificate as a Non-Fungible Token
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
