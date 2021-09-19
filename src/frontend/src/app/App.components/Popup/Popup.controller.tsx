import * as PropTypes from "prop-types";
import * as React from "react";

import { PopupView } from "./Popup.view";

type PopupProps = {
    title: string
    text: string
    link: string
    buttonText: string
    buttonTextClose: string
    isImage: boolean
    img: string
    closePopup: () => void
};

export const Popup = ({ title, text, link, buttonText, closePopup, isImage, img, buttonTextClose }: PopupProps) => {
    return <PopupView isImage={isImage}
                      img={img}
                      closePopup={closePopup}
                      buttonText={buttonText}
                      buttonTextClose={buttonTextClose}
                      link={link}
                      text={text}
                      title={title} />;
};

Popup.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    img: PropTypes.string,
    isImage: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonTextClose: PropTypes.string,
    closePopup: PropTypes.func
};
