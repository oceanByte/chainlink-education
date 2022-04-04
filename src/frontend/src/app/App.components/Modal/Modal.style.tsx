import styled from 'styled-components/macro'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  z-index: 999;
`;

export const Content = styled.div`
  border-radius: 22px;
  box-shadow: 0px 0px 49px -17px rgb(0 0 0 / 62%);
  background: #fff;
  max-height: 300px;
  height: 100%;
  min-height: 200px;
  position: relative;
  width: 600px;
  padding: 20px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    max-height: 400px;
  }
`;
