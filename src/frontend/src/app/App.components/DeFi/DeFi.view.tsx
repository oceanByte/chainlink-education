import React from 'react'
import classnames from 'classnames';

type Tab = {
    tab: string,
    image: string,
    text: string
}

type DeFiViewProps = {
    topTabs: Tab[],
    bottomTabs: Tab[],
    currentTab: Tab,
    setCurrentTab: (tab: Tab) => void
}

export const DeFiView = ({ topTabs, bottomTabs, currentTab, setCurrentTab }: DeFiViewProps) => {

    return (
        <div className='defi-wrapper'>
            <div className='defi__tabs'>
                <div className='defi__tabs-row'>
                    {topTabs.map((tab) => (
                        <div
                            className={classnames('defi__tabs-tab', tab.tab === currentTab.tab && 'defi__tabs-active__tab')}
                            onClick={() => setCurrentTab(tab)}
                            key={tab.tab}
                        >
                            {tab.tab}
                        </div>
                    ))}
                </div>
                <div className='defi__tabs-row'>
                    {bottomTabs.map((tab) => (
                        <div
                            className={classnames('defi__tabs-tab', tab.tab === currentTab.tab && 'defi__tabs-active__tab')}
                            onClick={() => setCurrentTab(tab)}
                            key={tab.tab}
                        >
                            {tab.tab}
                        </div>
                    ))}
                </div>
            </div>

            <div className='defi__content'>
                <img className='defi__content-image' src={currentTab.image} alt={currentTab.tab} />
                <p className='defi__content-text'>{currentTab.text}</p>
            </div>
        </div >
    )
}