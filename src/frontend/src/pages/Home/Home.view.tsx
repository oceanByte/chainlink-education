import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import * as React from 'react'

export const HomeView = () => {
  return (
    <div className='home'>
      <div className='home-intro mt-96'>
        <div className='home-intro-content'>
          <div className='home-intro-content__header'>Learn to program with Chainlink Academy</div>
          <div className='home-intro-content__paragraph mt-30'>
            Chainlink's decentralized oracle network provides reliable, tamper-proof
            inputs and outputs for complex smart contracts on any blockchain
          </div>
          <button className='home-intro-content__button btn mt-40'>Get started for FREE</button>
        </div>
        <div className='home-intro__image' />
      </div>
      <div className='home-ellipse' />
    </div>
  )
}
