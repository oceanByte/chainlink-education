import React from 'react'
import { Helmet } from 'react-helmet'

export const AppMeta = () => (
  <Helmet>
    <title>Chainlink Academy</title>
    <base target='_blank' />
    <meta name="description" content="Learn Chainlink Protocol" />
    <meta property="og:title" content="Learn Chainlink Protocol | ChainlinkAcademy" />
    <meta property="og:url" content="https://Chainlink.academy" />
    <meta property="og:site_name" content="ChainlinkAcademy" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="Learn Chainlink Protocol" />

  </Helmet>
)
