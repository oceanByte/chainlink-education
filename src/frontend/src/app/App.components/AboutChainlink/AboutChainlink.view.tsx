import React from "react";

type AboutChainlinkViewProps = {
    showVideo: boolean,
    setShowVideo: (prevState: boolean) => void
}

export const AboutChainlinkView = ({ showVideo, setShowVideo }: AboutChainlinkViewProps) => {

    return (
        <div className="about__chainlink">
            <div className="about__chainlink-wrapper">
                <div className="about__chainlink-content__header">
                    The industry standard oracle network
                </div>
                <br />
                <br />
                <div className="about__chainlink-content__text">
                    Chainlink greatly expands the capabilities of smart contracts by enabling access to real-world
                    data and off-chain computation while maintaining the security and reliability guarantees inherent
                    to blockchain technology.
                </div>
            </div>
            <div className="about__chainlink-content__image" onClick={() => setShowVideo(true)}>
                <div className="about__chainlink-play__btn" />
            </div>
            {showVideo && (<div className="about__chainlink-modal" onClick={() => setShowVideo(false)}>
                <div className="about__chainlink-cross">+</div>
                <iframe onClick={e => e.stopPropagation()} src="https://www.youtube.com/embed/4ff9esY_4aU" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>)}
        </div >
    )
}

