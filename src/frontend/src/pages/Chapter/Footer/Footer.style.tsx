import styled from 'styled-components/macro'

export const FooterStyled = styled.div`
  height: 70px;
  background: #f2f2f2;
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    margin: 0 10px;
    justify-content: space-between;
  }

  a {
    bottom: 20px;
    button {
      transform: scale(0.9);
      width: 200px;
    }
  }

  @media (max-width: 900px) {
    button {
      margin: 5px 0;
      height: 50px;
      width: 150px !important;
    }
  }
`
export const ProgressBarWrapper = styled.div`
  width: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`
