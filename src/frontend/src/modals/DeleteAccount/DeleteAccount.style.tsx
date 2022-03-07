import styled from 'styled-components/macro'
import { textColorBlue } from 'styles'


export const DeleteAccountWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PopupText = styled.p`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  color: ${textColorBlue};
`
