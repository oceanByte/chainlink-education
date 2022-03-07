import styled from 'styled-components/macro'
import { textColorBlue } from 'styles'


export const NoAccountWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 992px) {
      flex-direction: column;

      button {
        height: 50px;
        margin-bottom: 20px;
      }
    }

    button {
      height: 60px;
    }
  }

`

export const PopupTitle = styled.h2`
  padding: 20px;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #00c08b;
  text-align: center;
`

export const PopupText = styled.p`
  padding: 20px;
  font-size: 24px;
  text-align: center;
  margin: 40px 0 0;
  font-weight: 600;
  color: ${textColorBlue};
`

export const PopupImage = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
