import styled from 'styled-components/macro'

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
        margin-bottom: 20px;
      }
    }

    button {
      height: 40px;
    }
  }
`

export const PopupWrapper = styled.div`
  border-radius: 22px;
  box-shadow: 0px 0px 49px -17px rgb(0 0 0 / 62%);
  background: #fff;
  max-height: 600px;
  min-height: 200px;
  position: relative;
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    width: 90%;
    max-height: 90%;
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
  margin: 0;
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
