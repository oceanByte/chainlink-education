import React, { useState } from 'react'

import { DeFiView } from './DeFi.view'

import { defiContent } from './DeFi.content'

export const DeFi = () => {
    const [currentTab, setCurrentTab] = useState(defiContent[0])
    const topTabs = defiContent.slice(0, 3)
    const bottomTabs = defiContent.slice(3)

    return (
        <DeFiView
            topTabs={topTabs}
            bottomTabs={bottomTabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
        />
    )
}