import styled from 'styled-components/macro'

export const UseCertificateStyled = styled.div`
  .useCertificate {
    position: relative;
    
    &__list {
      width: 247px;
      position: absolute;
      top: 60px;
      left: 0;
      margin-top: 30px;
      transition: all .3s ease-in-out;
      visibility: hidden;
      opacity: 0;
      z-index: 10;

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      &.show {
        margin-top: 10px;
        visibility: visible;
        opacity: 1;
        transition: all 0.3s ease;
      }

      .social-networks__wrapp {
        margin-top: 10px;
      }
    }
  }
`
