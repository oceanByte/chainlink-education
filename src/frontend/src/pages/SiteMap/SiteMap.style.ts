import styled from 'styled-components/macro'

export const SiteMapContainer = styled.div`
  .header {
    margin: 0;
  }
`

export const SiteMapWrapp = styled.div`
  padding-left: calc( 20px + 20 * ((100vw - 1024px) / 576));
  padding-right: calc( 20px + 20 * ((100vw - 1024px) / 576));
`

export const Title = styled.div`
  padding: 0;
  margin: 40px 0 30px;
  width: 100%;
  text-align: center;
  font-family: Circular Std Book;
  color: #0c162c;
  font-weight: 900;
  font-size: 40px;

  @media (max-width: 1023px) {
    font-size: 32px;
  }
  @media (max-width: 767px) {
    font-size: 26px;
  }
  @media (max-width: 374px) {
    font-size: 24px;
    margin: 20px 0;
  }
`

export const SiteMapContent = styled.div`
  max-width: 1050px;
  width: 100%;
  margin: 0 auto;

  ul {
    list-style-type: none;
    li {
      padding: 10px 0;
      span {
        font-size: 16px;
        font-weight: 600;
      }

      ul {
        margin-top: 10px;
        padding-left: 20px;
      }
    }

    a {
      &:hover {
        color: #375bd2;
        transition: all .2s ease-in-out;
      }
    }
  }
`