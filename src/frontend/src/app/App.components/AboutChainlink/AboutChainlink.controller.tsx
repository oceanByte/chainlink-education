import React, { useState } from 'react'

import { AboutChainlinkView } from './AboutChainlink.view'

export const AboutChainlink = () => {
    const [showVideo, setShowVideo] = useState(false)

    return (
        <AboutChainlinkView showVideo={showVideo} setShowVideo={setShowVideo} />
    )
}