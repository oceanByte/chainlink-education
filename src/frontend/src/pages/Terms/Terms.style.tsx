import styled from 'styled-components/macro'

import { FullPage } from 'styles'

export const TermsStyled = styled.div`
  position: relative;
  background: white;
  padding-bottom: 30px;
  padding-top: 100px;

  > img {
    position: absolute;
    top: calc(33vh);
    left: 0;
    width: 100%;
    z-index: -1;
    opacity: 0.5;
  }
`

export const TermsPage = styled(FullPage)``

export const TermsContainer = styled.div`
  > h1 {
    margin-bottom: 10px;
  }

  > h2 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  > ul {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`
