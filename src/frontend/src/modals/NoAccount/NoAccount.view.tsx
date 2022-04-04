import * as React from 'react'

import { PopupTitle, PopupText, NoAccountWrapper, PopupImage} from './NoAccount.style'
import {Button} from "../../app/App.components/Button/Button.controller";
import {Link} from 'react-router-dom';
import { Modal } from 'app/App.components/Modal/Modal.view';

interface NoAccountProps {
  open: boolean,
  title: string,
  text: string,
  link: string,
  buttonText: string
  buttonTextClose: string
  isImage: boolean
  img: string
  onClose: () => void
}

export const NoAccountModal = ({
  open,
  text,
  title,
  link,
  buttonText,
  onClose,
  isImage,
  img,
  buttonTextClose
}: NoAccountProps) => {
  return (
    <Modal open={open} onClose={onClose}>
        <NoAccountWrapper>
            { title ?  <PopupTitle>{title}</PopupTitle> : null }
            { isImage ? <PopupImage> <img src={img} alt="popup"/></PopupImage> : null }
            <PopupText>{ text }</PopupText>
            <div className={'button-wrapper'}>
                <Button onClick={onClose} text={buttonTextClose} />
                <Link to={link}>
                    <Button text={buttonText} />
                </Link>
            </div>
        </NoAccountWrapper>
    </Modal>
  )
}
