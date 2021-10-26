import React, { useEffect } from 'react'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormInputs, updateFormFromBlur, updateFormFromChange, updateFormFromSubmit } from '../../helpers/form'

import { ContactUsInputs } from '../../shared/user/ContactUs'
import AOS from 'aos'
import 'aos/dist/aos.css'

type HomeViewProps = {
  contactUsCallback: (values: any) => void
}

export const HomeView = ({ contactUsCallback }: HomeViewProps) => {
  const [form, setForm] = useState<FormInputs>({
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    subject: { value: '', error: '' },
    question: { value: '', error: '' },
  })

  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromChange(e, form, ContactUsInputs)
    setForm(updatedForm)
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromBlur(e, form)
    setForm(updatedForm)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    const updatedForm = updateFormFromSubmit(event, form, ContactUsInputs)
    setForm(updatedForm)
    return
    contactUsCallback(form)
  }

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
              Complete the course and receive your certificate as a Non-Fungible Token
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
              Earn To Learn
            </div>
            <div className="home-num-item-content__text__paragraph p-font" data-aos="fade-up" data-aos-delay="200">
              Get your Chainlink Academy mainnet account created for free on course completion
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
              Join the builders of Chainlink Academy on Github. Earn Chainlink Academy if your PR is accepted
            </div>
          </div>
        </div>
      </div>
      <div className="home-content home-join">
        <div className="home-join__header h-font">JOIN THE FUTURE</div>
        <div className="home-join__line" />
        <div className="home-join-content">
          <div className="home-join-content__header h-font">
            The decentralized internet, or Web3, has been growing at a fast pace since its inception in 2009.
          </div>
          <div className="home-join-content-column">
            <div className="home-join-content-column__paragraph p-font">
              It is now a magnet to talent, with more smart developers joining every day. Web3 monthly developers are up
              +15% over 2020, following investments by venture capital of about $900M USD.
              <br />
              <br />
              This is very similar to the growth of internet services in the early 2000s, and hints at significant
              development for years to come. Importantly, the infrastructure has matured and makes it easy to create
              dApps, the decentralized equivalent to Apps.
            </div>
            <Link to="/chainlinkIntroduction/chapter-1">
              <button className="home-join-content-column__button btn btn-green mt-40 h-font">
                <span className="home-join-content-column__button__text">Join now</span>
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
            <div className="home-get-started-content__header h-font">Immerse yourself in the course narrative</div>
            <div className="home-get-started-content__paragraph p-font">
              You are about to play the role of a web developer at the Meme Museum. <br />
              <br />
              The year is 2029, the near future. Things are not that different from today except perhaps that life is
              80% digital now. Innovations that seemed like breakthroughs in the early 2020s are now widely adopted.
              Chainlink Protocol is the leading blockchain platform.
            </div>
            <Link to="/chainlinkIntroduction/chapter-1">
              <button className="home-get-started-content__button btn btn-green mt-40 h-font">
                <span className="home-get-started-content__button__text">Get started for FREE</span>
                <span className="arrow-upright" />
              </button>
            </Link>
          </div>
          <div className="home-get-started-drawings">
            <div className="home-get-started-drawings-boxes">
              <div className="home-get-started-drawings-boxes__gray-box" />
              <div className="home-get-started-drawings-boxes__blue-box p-font">
                <span>
                  The new NFT Meme Museum in Rio deJaneiro is the hottest thing right now. Elon Musk was there at its
                  inauguration last week and that says something!
                </span>
              </div>
            </div>
            <div className="home-get-started-drawings__speaker" />
          </div>
        </div>
      </div>
      <div className="home-content home-contact-us" id="contactus">
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
      </div>
    </div>
  )
}
