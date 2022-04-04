import styled from 'styled-components/macro'
import { textColorBlue } from 'styles'

export const PopupStyle = styled.div`
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
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

export const PopupWrapper = styled.div`
  border-radius: 22px;
  box-shadow: 0px 0px 49px -17px rgb(0 0 0 / 62%);
  background: #fff;
  max-height: 300px;
  height: 100%;
  min-height: 200px;
  position: relative;
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    max-height: 400px;
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
  margin: 70px 0 0;
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
