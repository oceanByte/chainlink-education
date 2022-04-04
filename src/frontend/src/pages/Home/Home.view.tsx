import AOS from 'aos'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { PublicUser } from 'shared/user/PublicUser'
import { CourseCardView } from 'app/App.components/CourseCard/CourseCard.view'
import { Option } from 'app/App.components/Select/Select.view'
import 'aos/dist/aos.css'

type HomeViewProps = {
  user?: PublicUser
  contactUsCallback: (values: any) => void
}

// from src/api/src/shared/course/CourseType.ts
export const COURSES = [
  {
    title: 'Chainlink 101',
    description: `Chainlink decentralized oracle networks provide tamper-proof inputs, outputs, and computations.`,
    difficulty: 2,
    status: 'NEW',
    progress: [],
  },
  {
    title: 'Solidity Introduction',
    description: `Solidity is an object-oriented, high-level language for implementing smart contracts. COMING SOON.`,
    difficulty: 3,
    status: 'New',
    progress: [],
  },
  {
    title: 'VRF v2 Introduction',
    description: `Study how VRF can be used to bring Verfiable Randomness to blockchain.`,
    difficulty: 3,
    status: 'New',
    progress: [],
  },
]

export const HomeView = ({ user }: HomeViewProps) => {
  let defaultCourse: Option = { name: 'Chalink Introduction', path: 'chainlinkIntroduction' }

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])

  return (
    <div className="home">
      <div className="home-wrapper intro">
        <div className="home-content home-intro">
          <div className="home-intro-content">
            <div className="home-intro-content__header h-font">Learn to program with Chainlink Academy</div>
            <div className="home-intro-content__paragraph mt-30 p-font">
              Chainlink's decentralized oracle network provides reliable, tamper&#8209;proof inputs and outputs for
              complex smart contracts on any blockchain
            </div>
            <Link to="/chainlinkIntroduction/chapter-1">
              <button className="home-intro-content__button btn btn-green mt-40 h-font">
                <span className="home-intro-content__button__text"> Get started for FREE </span>
                <span className="arrow-upright" />
              </button>
            </Link>
          </div>
          <div className="home-intro__image" />
        </div>
      </div>
      <div className="home-ellipse home-ellipse-1" />

      <div className="home-wrapper courses">
        <div className="home-content home-courses-content">
          <div className="home-courses-content__header h-font">Get started now</div>
          {user && user.courses && user.courses.length > 0 ? (
            <div className="home-courses-content__items">
              {user.courses?.map((course) => (
                <div key={course._id} className="home-course">
                  <CourseCardView course={course} user={user} activeCourse={defaultCourse} />
                </div>
              ))}
            </div>
          ) : (
            <div className="home-courses-content__items">
              {COURSES.map((course) => (
                <div key={course.title} className="home-course">
                  <CourseCardView course={course} user={user} activeCourse={defaultCourse} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="home-content home-num-item">
        <div className="home-num-item__image nft" />
        <div className="home-num-item-content">
          <div className="home-num-item-content__header">
            <div className="home-num-item-content__header__number h-font" data-aos="fade-up" data-aos-delay="100">
              01
            </div>
            <div className="home-num-item-content__header__line" />
          </div>
          <div className="home-num-item-content__text">
            <div className="home-num-item-content__text__header h-font" data-aos="fade-up" data-aos-delay="150">
              NFT Certificate
            </div>
            <div className="home-num-item-content__text__paragraph p-font" data-aos="fade-up" data-aos-delay="200">
              Complete a course and receive your certificate as a Non-Fungible Token (NFT) and share your results on
              social media.
            </div>
          </div>
        </div>
      </div>
      <div className="home-content home-num-item reversed">
        <div className="home-num-item__image etl" />
        <div className="home-num-item-content">
          <div className="home-num-item-content__header half-hidden">
            <div className="home-num-item-content__header__number h-font" data-aos="fade-up" data-aos-delay="100">
              02
            </div>
            <div className="home-num-item-content__header__line" />
          </div>
          <div className="home-num-item-content__text">
            <div className="home-num-item-content__text__header h-font" data-aos="fade-up" data-aos-delay="150">
              Save your progress
            </div>
            <div className="home-num-item-content__text__paragraph p-font" data-aos="fade-up" data-aos-delay="200">
              Register your account and get an overview of your progress. You can also save your progress and resume it
              later.
            </div>
          </div>
        </div>
      </div>
      <div className="home-content home-num-item">
        <div className="home-num-item__image cnt" />
        <div className="home-num-item-content">
          <div className="home-num-item-content__header half-hidden">
            <div className="home-num-item-content__header__number h-font" data-aos="fade-up" data-aos-delay="100">
              03
            </div>
            <div className="home-num-item-content__header__line" />
          </div>
          <div className="home-num-item-content__text">
            <div className="home-num-item-content__text__header h-font" data-aos="fade-up" data-aos-delay="150">
              Contribute to Chainlink Academy
            </div>
            <div className="home-num-item-content__text__paragraph p-font" data-aos="fade-up" data-aos-delay="200">
              Join the builders of Chainlink Academy on Github. Implement new features, add further courses, contribute
              to the documentation, and more.
            </div>
          </div>
        </div>
      </div>
      <div className="home-content home-join">
        <div className="home-join__header h-font">BUILD THE FUTURE</div>
        <div className="home-join__line" />
        <div className="home-join-content">
          <div className="home-join-content__header h-font">
            Oracles connect off-chain data to on-chain smart contracts resulting in new types of applications.
          </div>
          <div className="home-join-content-column">
            <div className="home-join-content-column__paragraph p-font">
              Chainlink, smart contracts, blockchains, and the entire cryptocurrency world have been a hot topic of
              discussion for several years now.
              <br />
              <br />
              Whether it's companies like EY and Microsoft looking to use smart contracts to improve their business
              processes or artists and athletes like LaMelo Ball creating their own "NFTs." Or new companies looking to
              disrupt long-standing establishments such as the insurance industry.
              <br />
              <br />
              Chainlink and smart contracts are working to become the backbone for world-changing applications.
            </div>
            <Link to="/chainlinkIntroduction/chapter-1">
              <button className="home-join-content-column__button btn btn-green mt-40 h-font">
                <span className="home-join-content-column__button__text">Learn about it here</span>
                <span className="arrow-upright" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-ellipse home-ellipse-2" />
      <div className="home-wrapper get-started">
        `
        <div className="home-content home-get-started">
          <div className="home-get-started-content">
            <div className="home-get-started-content__header h-font">
              Learn about Oracles, Chainlink and Hybrid Smart Contracts
            </div>
            <div className="home-get-started-content__paragraph p-font">
              Start your journey and understand how to use Oracles to connect off-chain data to on-chain smart
              contracts. Learn to use Chainlink to create dynamic NFTs that react to the real world.
              <br />
              <br />
            </div>
            <Link to="/chainlinkIntroduction/chapter-1">
              <button className="home-get-started-content__button btn btn-green mt-40 h-font">
                <span className="home-get-started-content__button__text">Start your journey</span>
                <span className="arrow-upright" />
              </button>
            </Link>
          </div>
          <div className="home-get-started-drawings">
            <div className="home-get-started-drawings-boxes">
              <div className="home-get-started-drawings-boxes__gray-box" />
              <div className="home-get-started-drawings-boxes__blue-box p-font">
                <span>
                  NFTs are still in their early days. While most NFT projects point to a static image file, you can
                  utilize Oracles to create dynamic NFTs. They can react to outside real-world events, such as the price
                  of a cryptocurrency.
                </span>
              </div>
            </div>
            <div className="home-get-started-drawings__speaker" />
          </div>
        </div>
      </div>
      {/* <div className="home-content home-contact-us scrollTo">
        <form
          className="home-contact-us-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <div className="home-contact-us-form__header h-font">Get in touch with us</div>
          <div className="home-contact-us-form-fields fields-row">
            <label className="home-input home-input-fn">
              <span className="home-input__label h-font">first name</span>
              <input
                className={`home-input__input p-font`}
                name="firstName"
                onChange={handleChange}
                placeholder=""
                type="text"
              />
            </label>
            <label className="home-input home-input-ln input-ml-20">
              <span className="home-input__label h-font">last name</span>
              <input
                className={`home-input__input p-font`}
                name="lastName"
                onChange={handleChange}
                placeholder=""
                type="text"
              />
            </label>
          </div>
          <div className="home-contact-us-form-fields fields-row">
            <label className="home-input home-input-email">
              <span className="home-input__label h-font">email address</span>
              <input
                className={`home-input__input p-font`}
                name="email"
                onChange={handleChange}
                placeholder=""
                type="text"
              />
            </label>
            <label className="home-input home-input-subject input-ml-20">
              <span className="home-input__label h-font">subject</span>
              <input
                className={`home-input__input p-font`}
                name="subject"
                onChange={handleChange}
                placeholder=""
                type="text"
              />
            </label>
          </div>
          <div className="home-contact-us-form-fields">
            <label className="home-input home-input-q">
              <span className="home-input__label h-font">question</span>
              <input
                className={`home-input__input p-font w-100`}
                name="question"
                onChange={handleChange}
                placeholder=""
              />
            </label>
          </div>
          <button type="submit" className="home-contact-us-form__button btn btn-green mt-40 h-font">
            <span className="home-contact-us-form__button__text">Send inquiry</span>
            <span className="arrow-upright" />
          </button>
        </form>
        <div className="home-contact-us-contacts p-font">
          <div className="home-contact-us-contacts__header">CONTACT INFORMATION</div>
          <div className="home-contact-us-contacts__mail">chainlink_academy@gmail.com</div>
          <div className="home-contact-us-contacts__office-hours">OFFICE HOURS</div>
          <div className="home-contact-us-contacts__days">Monday: 1pm - 2pm EST</div>
          <div className="home-contact-us-contacts-social-media">
            <div className="home-contact-us-contacts-social-media__item item-discord-2">
              <span />
            </div>
            <div className="home-contact-us-contacts-social-media__item item-telegram-2">
              <span />
            </div>
            <div className="home-contact-us-contacts-social-media__item item-twitter-2">
              <span />
            </div>
          </div>
        </div>
        <div className="home-contact-us__mail-line" />
        <div className="home-contact-us__mail" />
        <div className="home-contact-us__square square-1" />
        <div className="home-contact-us__square square-2" />
      </div> */}
    </div>
  )
}
