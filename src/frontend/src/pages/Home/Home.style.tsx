import styled from 'styled-components/macro'

import { FullPage } from 'styles'

export const HomeStyled = styled.div`
  position: relative;
  background: white;
  > img {
    position: absolute;
    top: calc(33vh - 130px);
    left: 0;
    width: 100%;
    z-index: -1;
  }
`

export const Footer = styled.footer`
  background-color: #000000;
  /* height: 190px; */
  /* margin: 0 -5vw; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  .left {
    padding: 25px 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    p {
      color: white;
      font-size: 14px;
    }
    img {
      width: 265px;
      margin-bottom: 50px;
    }
  }
  .center {
    display: flex;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      @media (max-width: 480px) {
        padding: 0;
        align-items: center;
      }

      p {
        font-style: normal;
        font-weight: 900;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #00c1de;
        margin-bottom: 15px;
      }
      li {
        margin-bottom: 15px;
        a {
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 22px;
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
  .right {
    padding: 60px;
    /* margin-top: 14px; */
    display: flex;
    align-items: center;
    img {
      width: 32px;
      margin-left: 25px;
    }
  }

  .socials {
    display: flex;
    align-items: center;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 10px;
    margin-right: 30px;
  }

  .link {
    color: #fff;
  }

  .footer-wrapper {
    width: 90vw;
    max-width: 1280px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: 1000px) {
    .right {
      flex-direction: column;
    }

    .socials {
      margin-top: 10px;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 800px) {
    .footer-wrapper {
      flex-direction: column;
    }

    .left {
      padding: 60px 60px 10px;
    }

    .right {
      padding: 10px 10px 60px;
    }

    .links {
      grid-template-columns: repeat(1, 1fr);
      text-align: center;
    }
  }
`

export const HomePage = styled(FullPage)``

export const HomeContainer = styled.div`
  > h1 {
    margin-bottom: 10px;
    color: red;
  }

  > a > button {
    margin-top: 20px;
    width: 160px;
  }

  span {
    font-size: 16px;
    display: block;
  }

  button:hover {
    transform: scale(1.05);
  }

  section.benefits {
    padding: 200px 0px 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
      width: 100%;
      margin: 0px 0px 40px;
      font-weight: 900;
    }
    ul {
      display: flex;
      justify-content: space-between;
      padding: 0;
      padding: 0 200px;
      margin-bottom: 75px;

      @media (max-width: 992px) {
        flex-wrap: wrap;
        padding: 0px;
        margin-bottom: 10px;
      }

      li {
        width: 30%;
        list-style-type: none;
        box-shadow: 0px 0px 68px 0px rgba(190, 179, 194, 0.6);
        padding: 20px;
        border-radius: 22px;

        @media (max-width: 992px) {
          width: 32%;
          margin-bottom: 20px;
        }

        @media (max-width: 680px) {
          width: 45%;
        }

        @media (max-width: 460px) {
          width: 100%;
        }

        .icon {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px auto 30px;
          border-radius: 100%;

          &.first {
            background: rgba(134, 24, 251, 0.2);
          }
          &.second {
            background: rgba(251, 120, 24, 0.2);
          }
          &.third {
            background: rgba(251, 31, 24, 0.2);
          }
          &.last {
            background: rgba(24, 251, 45, 0.2);
          }
          img {
            width: 30%;
          }
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin: 10px 0px 20px;
        }
        .description {
          font-size: 16px;
        }
      }
    }
  }

  section.first {
    /* background-image: url('/images/museum_exterior_1.svg'); */
    background-image: url('/museum_exterior_1.svg');
    /* background-image: url('/images/chap_3_0.png'); */
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 881px 684px;
    min-height: 100vh;
    position: relative;
    margin-bottom: -200px;
    margin-right: -60px;
    margin-top: 50px;
    z-index: 1;

    .left {
      width: 50vw;
      padding-bottom: 5vw;
      h1 {
        font-weight: 900;
      }
      p {
        font-size: 24px;
        line-height: 36px;
        max-width: 600px !important;
      }
      button {
        margin-top: 50px;
        /* margin-left: 100px; */
      }
    }
  }

  section.second {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('distortion-footer.svg');
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: 685px 147px;
    margin: 0 -5vw;
    height: 650px;
    position: relative;

    .paragraph {
      max-width: 690px;
    }

    h1 {
      width: 100%;
      text-align: center;
      padding-top: 10px;
      font-weight: 900;
    }
    background-color: #f2f2f2;

    .left {
      display: flex;
      flex-direction: row;

      p {
        padding: 10px 0px;
      }
      img {
        height: 693px;
        min-width: 276px;
        width: 276px;
        margin-left: 50px;
        position: absolute;
        left: 0px;
      }
    }
  }

  section.third {
    h1 {
      text-align: center;
      margin-top: 90px;
      font-weight: 900;
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 690px;
      width: 100%;
      margin: 0 auto;

      a {
        margin-top: 44px;
        text-align: center;
      }
    }

    .museum-interior {
      margin-bottom: -6px;
    }
  }

  footer.footer {
    background-color: #000000;
    height: 190px;
    margin: 0 -5vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left {
      padding: 60px;
      p {
        color: white;
        font-size: 14px;
      }
    }
    .right {
      padding: 60px;
      margin-top: 14px;
      img {
        width: 32px;
        margin-left: 25px;
      }
    }
  }

  @media (max-width: 1200px) {
    section.first {
      background-size: 881px 684px;
      background-position: right -90px bottom 0;
      min-height: 770px;
    }

    section.second {
      .button--center {
        margin-bottom: 350px;
      }
    }
    section.second {
      h1 {
        margin-top: 190px;
      }
    }
  }

  @media (min-width: 1201px) {
    section.first {
      //height: 100vh;
      min-height: 800px;
      .left {
        width: 55vw;
        p {
          max-width: 51vw;
        }
        button {
          margin-left: 100px;
        }
        h1 {
          font-size: 72px;
          margin-top: 72px;
        }
      }
    }
  }

  @media (min-width: 1401px) {
    section.first {
      .left {
        width: 44vw;
        p {
          max-width: 44vw;
        }
        button {
          margin-left: 200px;
        }
        h1 {
          font-size: 68px;
          margin-top: 72px;
        }
      }
    }
  }

  @media (min-width: 1801px) {
    section.first {
      //height: 100vh;

      min-height: 800px;
      .left {
        width: 38vw;
        p {
          max-width: 38vw;
        }
        button {
          margin-left: 200px;
        }
        h1 {
          font-size: 72px;
          margin-top: 72px;
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1111px) {
    section.first {
      background-size: 621px 598px;

      margin-top: -100px;
      .left {
        width: 66vw;
        &__header {
          margin-top: 60px;
        }
        p {
          max-width: 66vw;
        }
        button {
          margin-left: 100px;
        }
        h1 {
          //margin-top: 72px;
        }
      }
    }
  }

  /* @media (min-height: 769px) and (max-width: 940px) {
    .left {
      display: flex;
      flex-direction: column;
    }
  } */

  @media (min-width: 1024px) {
    p {
      text-align: justify;
    }
  }

  @media (max-width: 768px) {
    section.first {
      margin-top: 130px;
      margin-right: 0;
      background-size: 628px 601px;
      min-height: 1070px;
      padding: 0 20px;
      /* padding-left: 30px; */

      .left:not(button) {
        width: 87vw;
        /* width: 100%; */
        padding-bottom: 5vw;
        display: flex;
        flex-direction: column;

        h1 {
          font-weight: 900;
        }

        p {
          font-size: 24px;
          line-height: 36px;
          max-width: 590px;
          text-align: left;
        }
        button {
          display: flex;
          margin: 50px auto 0 auto;
        }
      }
    }

    section.second {
      height: calc(100% + 250px);

      .button--center {
        margin-top: 0;
        margin-bottom: 200px;
      }

      .left {
        flex-direction: column;
        padding: 0;
        align-items: center;
        img {
          height: 88vh;
        }
        p {
          padding-bottom: 20px;
        }
      }

      h1 {
        padding-top: 155px;
      }
    }

    footer.footer {
      .right {
        padding: 0;
        padding-top: 10px;
        a {
          display: block;
          margin-bottom: 20px;
          padding-right: 60px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    .section.second {
      .left {
        padding: 0;
      }
    }
    footer.footer {
      flex-direction: column-reverse;
      height: 200px;
      .right {
        display: inline-flex;
        padding-top: 42px;
        margin: 0 auto;
      }
      .left {
        padding-bottom: 20px;
        padding-top: 0;
        /* margin: 0 auto; */
        text-align: center;
      }
    }
  }
`
