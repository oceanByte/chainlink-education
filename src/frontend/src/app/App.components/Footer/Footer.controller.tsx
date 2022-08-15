import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'helpers/useMediaQuery'

import { FooterView } from './Footer.view'

export const Footer: any = () => {
    const { pathname } = useLocation();
    const isMobile = useMediaQuery('770px');
    const hideLinks = isMobile && pathname.replace('/', '')

    return (
        <FooterView hideLinks={hideLinks} />
    )
}
