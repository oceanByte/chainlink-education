import styled from "styled-components/macro";

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
    .link {
        color: #42edf8;
        margin-bottom: 30px;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
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
      color: #00C1DE;
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
          color: #FFFFFF;
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
    color: #fff
  }

  .footer-wrapper{
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
    .footer-wrapper{
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
