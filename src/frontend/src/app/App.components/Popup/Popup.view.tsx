import * as PropTypes from 'prop-types'
import * as React from 'react'

import { PopupStyle, PopupTitle, PopupText, PopupWrapper, PopupImage} from './Popup.style'
import {Button} from "../Button/Button.controller";
import {Link} from 'react-router-dom';

type PopupProps = {
    title: string
    text: string,
    link: string,
    buttonText: string
    buttonTextClose: string
    isImage: boolean
    img: string
    closePopup: () => void
}

export const PopupView = ({ text, title, link, buttonText, closePopup, isImage, img, buttonTextClose }: PopupProps) => {
    return (
      <PopupStyle>
          <PopupWrapper>
              { title ?  <PopupTitle>{title}</PopupTitle> : null }
              { isImage ? <PopupImage> <img src={img} alt="popup"/></PopupImage> : null }
              <PopupText>{ text }</PopupText>
              <div className={'button-wrapper'}>
                  <Button onClick={closePopup} text={buttonTextClose} />
                  <Link to={link}>
                      <Button text={buttonText} />
                  </Link>
              </div>
          </PopupWrapper>
      </PopupStyle>
    )
}

PopupView.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    img: PropTypes.string,
    isImage: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonTextClose: PropTypes.string,
    closePopup: PropTypes.func
}
