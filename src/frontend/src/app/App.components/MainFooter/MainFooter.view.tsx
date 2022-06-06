import * as PropTypes from "prop-types";
import React from 'react';

import { PublicUser } from "../../../shared/user/PublicUser";
import { Footer } from './MainFooter.style'

type FooterViewProps = {
    user?: PublicUser
}

export const ViewMainFooter  = ({user}: FooterViewProps) => {
    return (
        <Footer>
            <div className="footer-wrapper">
            </div>
        </Footer>
    )
}

ViewMainFooter.propTypes = {
    user: PropTypes.object,
}

ViewMainFooter.defaultProps = {}
