import Header from 'app/App.components/Header/Header.controller'
import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import * as React from 'react'

//prettier-ignore
import { TermsContainer, TermsPage, TermsStyled } from './Terms.style'

export const TermsView = () => {
  return (
    <TermsStyled>
      <Header />
      <TermsPage>
        <TermsContainer>
          <h1>Chainlink Academy Privacy Policy</h1>
          <p>
            This privacy policy will explain how our organization uses the personal data we collect from you when you
            use our website.
          </p>
          <h2>What data do we collect?</h2>
          <p>chainlink.education collects the following data:</p>
          <ul>
            <li>
              Personal identification information:
              <ul>
                <li>username and email address (to keep track of your progress) </li>
                <li>name and surname (to deliver your completion certificate)</li>
              </ul>
            </li>
            <li>Anonymized website usage data </li>
          </ul>
          <h2>How do we collect your data?</h2>
          <p>
            You directly provide chainlink.education with most of the data we collect. We collect data and process data when
            you:
          </p>
          <ul>
            <li>Register online or place an order for any of our products or services.</li>
            <li>
              Voluntarily complete a customer survey or provide feedback on any of our message boards or via email.
            </li>
            <li>Use or view our website via your browser’s cookies.</li>
          </ul>
          <p>chainlink.education may also receive your data indirectly from the following sources:</p>
          <ul>
            <li>Google Analytics</li>
          </ul>
          <h2>How will we use your data?</h2>
          <p>chainlink.education collects your data so that we can:</p>
          <ul>
            <li>Process your order and manage your account.</li>
            <li>Email you with information and news about chainlink.education or about Chainlink Protocol.</li>
            <li>Email you to invite you to join the Chainlink Protocol community</li>
          </ul>
          <p>chainlink.education does not share or sell your data with any other third party except the Chainlink Labs.</p>
          <h2>How do we store your data?</h2>
          <p>
            chainlink.education securely stores your data in a server located in Frankfurt, Germany. The strictest security
            policies and technologies are used to keep your data secure.
          </p>
          <p>
            chainlink.education will keep your data for a period of 10 years. Once this time period has expired, we will erase
            your data.
          </p>
          <h2>Marketing</h2>
          <p>
            chainlink.education may send you information related to Chainlink Academy, Chainlink Protocol or Chainlink Protocol community.{' '}
          </p>
          <p>
            You have the right at any time to stop chainlink.education from contacting you for any purposes. To do so, please
            contact us via email at the address provided.
          </p>
          <h2>What are your data protection rights?</h2>
          <p>
            chainlink.education would like to make sure you are fully aware of all of your data protection rights. Every user
            is entitled to the following:
          </p>
          <p>
            The right to access – You have the right to request chainlink.education for copies of your personal data. We may
            charge you a small fee for this service.
          </p>
          <p>
            The right to rectification – You have the right to request that chainlink.education correct any information you
            believe is inaccurate. You also have the right to request chainlink.education to complete the information you
            believe is incomplete.
          </p>
          <p>
            The right to erasure – You have the right to request that chainlink.education erase your personal data, under
            certain conditions.
          </p>
          <p>
            The right to restrict processing – You have the right to request that chainlink.education restrict the processing
            of your personal data, under certain conditions.
          </p>
          <p>
            The right to object to processing – You have the right to object to chainlink.education’s processing of your
            personal data, under certain conditions.
          </p>
          <p>
            The right to data portability – You have the right to request that chainlink.education transfer the data that we
            have collected to another organization, or directly to you, under certain conditions.
          </p>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these
            rights, please contact us at our email: zak@smartcontract.com{' '}
          </p>
          <h2>Cookies</h2>
          <p>
            Cookies are text files placed on your computer to collect standard Internet log information and visitor
            behavior information. When you visit our websites, we may collect information from you automatically through
            cookies or similar technology
          </p>
          <p>
            For further information, visit <a href="https://allaboutcookies.org">allaboutcookies.org</a>
          </p>
          <h2>How do we use cookies?</h2>
          <p>chainlink.education uses cookies in a range of ways to improve your experience on our website, including:</p>
          <ul>
            <li>Keeping you signed in</li>
            <li>Understanding how you use our website</li>
          </ul>
          <h2>What types of cookies do we use?</h2>
          <p>There are a number of different types of cookies, however, our website uses:</p>
          <ul>
            <li>
              Functionality – chainlink.education uses these cookies so that we recognize you on our website and remember your
              previously selected preferences. These could include what language you prefer and location you are in. A
              mix of first-party and third-party cookies are used.
            </li>
            <li>
              Advertising – chainlink.education uses these cookies to collect information about your visit to our website, the
              content you viewed, the links you followed and information about your browser, device, and your IP
              address.
            </li>
          </ul>
          <h2>How to manage cookies</h2>
          <p>
            You can set your browser not to accept cookies, and the above website tells you how to remove cookies from
            your browser. However, in a few cases, some of our website features may not function as a result.
          </p>
          <h2>Privacy policies of other websites</h2>
          <p>
            chainlink.education website contains links to other websites. Our privacy policy applies only to our website, so if
            you click on a link to another website, you should read their privacy policy.
          </p>
          <h2>Changes to our privacy policy</h2>
          <p>
            chainlink.education keeps its privacy policy under regular review and places any updates on this web page. This
            privacy policy was last updated on 15. January 2022.
          </p>
          <h2>How to contact us</h2>
          <p>
            If you have any questions about chainlink.education privacy policy, the data we hold on you, or you would like to
            exercise one of your data protection rights, please email us at:{' '}
            <a href="mailto:zak@smartcontract.com">zak@smartcontract.com</a>
          </p>
          <h2>How to contact the appropriate authority</h2>
          <p>
            Should you wish to report a complaint or if you feel that chainlink.education has not addressed your concern in a
            satisfactory manner, you may contact the Information Commissioner’s Office.
          </p>
        </TermsContainer>
      </TermsPage>
      <MainFooter />
    </TermsStyled>
  )
}
